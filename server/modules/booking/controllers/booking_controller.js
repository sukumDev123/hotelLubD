import mongoose from "mongoose";
const Booking = mongoose.model("Booking");
const User = mongoose.model("User");
const Room = mongoose.model("Room");

function userOrNotFunc(data) {
  return new Promise(async (res, rej) => {
    try {
      const emailFind = await User.find({
        email: data.body.user_booking.email
      });
      if (emailFind.length) {
        res(emailFind[0]);
      } else {
        const phoneFind = await User.find({
          phone: data.body.user_booking.phone
        });
        const user_ = phoneFind.length ? phoneFind[0] : false;
        res(user_);
      }
    } catch (error) {
      rej({
        message: error.message,
        status: 400
      });
    }
  });
}

function updateAsync(data) {
  return new Promise(async (res, rej) => {
    try {
      let userUpdate = await User.findByIdAndUpdate(data._id, data);
      let getUser = await User.findById(data._id).select(
        "displayname _id email phone reserveNum"
      );

      res(getUser);
    } catch (error) {
      rej(error);
    }
  });
}

function reserveNowFunc(data) {
  return new Promise(async (res, rej) => {
    const data_real = {
      user_booking: data.body.user_booking,
      room: data.body.room,
      create_at: data.body.create_at,
      check_in: data.body.check_in,
      check_out: data.body.check_out,
      total_price: data.body.total_price,
      night_num: data.body.night_num
    };
    const booking = new Booking(data_real);
    try {
      let save_ = await booking.save();

      res({
        message: "Save booking list success.",
        status: 200,
        data: booking
      });
    } catch (error) {
      rej(error);
    }
  });
}

/*********** */

export function showA_reser(req, res) {
  if (req.bookingParam) {
    res.json(req.bookingParam);
  }
}
export async function updateReserveRoom(req, res) {
  try {
    let updateBooking = await Booking.findByIdAndUpdate(
      req.bookingParam._id,
      req.body
    );
    let findUser = await Booking.findById(req.bookingParam._id);
    res.json(findUser);
  } catch (error) {
    res.status(403).json(error);
  }
}
export async function deleteReserveRoom(req, res) {
  try {
    let removeBooking = await Booking.findByIdAndRemove(req.bookingParam._id);
    let bookings = await Booking.find()
      .sort("-create_at")
      .limit(10);
    let num = await Booking.count();
    res.json({
      data_list: bookings,
      status: 200,
      size: num,
      message: "Delete list booking success."
    });
  } catch (error) {
    res.status(403).json(error);
  }
}
export function roomDateSetInSetOut(cI, cO, dataroom) {
  return new Promise((res, rej) => {
    try {
      let room_find = [];
      dataroom.forEach(async room_id => {
        let find_by_id = await Room.findById(room_id).select(
          "liveDate liveLatest _id"
        );
        find_by_id.liveDate.push(cI); // check in date
        find_by_id.liveLatest.push(cO);
        find_by_id.save();
      }); // room all reser
      res(true);
    } catch (error) {
      rej({
        message: error ? JSON.stringify(error) : "Room Save is problum",
        status: 503
      });
    }
  });
}
export async function reserveRoom(req, res) {
  try {
    let userOrNot = await userOrNotFunc(req); // check is user or not user
    if (userOrNot) {
      // if user +1 reservenum
      userOrNot.reserveNum += 1;
      let checkture = await updateAsync(userOrNot); // update and find user
      req.body.user_booking = checkture;
    } else {
      const displayname = `${req.body.user_booking.firstname} ${
        req.body.user_booking.lastname
      }`;
      req.body.user_booking = {
        displayname: displayname,
        email: req.body.user_booking.email,
        phone: req.body.user_booking.phone
      };
    }

    let roomCreateDate = roomDateSetInSetOut(
      req.body.check_in,
      req.body.check_out,
      req.body.room
    ); // set room checkin date and checkout date

    let reserveNow = await reserveNowFunc(req); // booking success.
    res.json({
      message: reserveNow.message,
      status: reserveNow.status,
      datacall: reserveNow.data
    });
  } catch (error) {
    next({
      message: JSON.stringify(error),
      status: error.status || 404
    });
    // res.status(error.status).json(error)
  }
}
export async function historyRoom(req, res, next) {
  try {
    if (req.query.start) {
      let bookings = await Booking.find()
        .sort("-create_at")
        .limit(10)
        .skip(parseInt(req.query.start));
      let num = await Booking.count();
      res.json({
        data_list: bookings,
        message: "Find success.",
        status: 200,
        size: num
      });
    } else {
      next({
        message: "query string is not support",
        status: 400
      });
    }
  } catch (error) {
    next(error);
  }
}
export function getBookingOneList(req, res, next) {
  if (req.bookingParam) {
    res.status(200).json(req.bookingParam);
  } else {
    next({
      status: 404,
      message: "Params you reqire is empty data."
    });
  }
}
export async function getParamRoom(req, res, next, paramReser) {
  try {
    let bookParam = await Booking.findById(paramReser);
    if (bookParam) {
      req.bookingParam = bookParam;
    }
    next();
  } catch (error) {
    next({
      message: error,
      status: 400
    });
  }
}
