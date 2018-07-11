

const config =  {
    DB : 'mongoDB://mongo/hotel',
    secret : 'secret_dev_mode',
    timeSetSession : 60*60,
    facebookIp : {

    },
    exp:'1h',
    expremember : '5h'  ,
    port: 3000 ,
    debug : true
}
/** 
 * @returns { config }
 */

export  default config