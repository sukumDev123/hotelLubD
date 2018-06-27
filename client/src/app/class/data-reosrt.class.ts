import { DataResort } from "../interface/data.interface";

export class DataResortClass {
    private _data : DataResort
    constructor(data : DataResort ) {
      this._data = data
    }
    check_Empty() : boolean {
      /**
       * For Check Value on _data need to not empty
       */
       return (this._data.title && this._data.photoMain && this._data.phone && this._data.detail && this._data.address) ? true : false
  
    }
    getShowData () {
      return this._data
    }
  }