class Banktopup {
    constructor() {
        this.axios = require('axios').default
        this.axios.defaults.baseURL = 'https://api-v1.banktopup.com'
    }
    setLicense(license){
        this.axios.defaults.headers.common['x-auth-license'] = license
    }
    setDeviceid(deviceid){
        this.deviceid = deviceid
    }
    setPin(pin){
        this.pin = pin
    }
    setAccountNo(account){
        this.account_no = account
    }
    Register(identification,year,month,day,pin,mobile_phone_no,account_no,device_brand,device_code){
        this.account_no = account_no
        this.pin = pin
        return this.API("POST","/api/v1/scb/register",{
            identification: identification,
            year: year,
            month: month,
            day: day,
            mobile_phone_no: mobile_phone_no,
            device_brand: device_brand,
            device_code: device_code,
        })
    }

    ConfirmOTP(deviceid , otp){
        this.deviceid = deviceid
        return this.API("POST",`/api/v1/scb/register/${this.deviceid}`,{
            otp:otp
        })
    }

    CheckDevice(deviceid) {
    this.deviceid = deviceid
        return this.API("POST",`/api/v1/scb/check_device`,{})
    }

    Transactions(previous_day,page_number ,page_size ){
        return this.API("POST","/api/v1/scb/transactions",{
            previous_day: previous_day,
            page_number: page_number,
            page_size: page_size
        })
    }
    Verification(account_to,bank_code,amount ){
        return this.API("POST","/api/v1/scb/verification",{
            account_to: account_to,
            bank_code: bank_code,
            amount: amount
        })
    }
    Transfer(account_to,bank_code,amount ){
        return this.API("POST","/api/v1/scb/transfer",{
            account_to: account_to,
            bank_code: bank_code,
            amount: amount
        })
    }

    API(method,path,data){
        return this.axios({
            method:method,
            url:path,
            data:{
                ...data,
                ...{
                    deviceid: this.deviceid,
                    pin: this.pin,
                    account_no: this.account_no
                }
            }
        })
    }

}
module.exports = new Banktopup()