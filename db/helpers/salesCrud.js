const orderModel = require("../models/orders");
const appCodes = require("../../utils/appcodes");
const orderOperations = {
  month(response) {
    orderModel.find({}, (err, doc) => {
      if (err) {
        console.log("Error in Record Add");
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error"
        });
      } else {
        if (doc) {
          var arr = new Array(12).fill(0);
          console.log("Record  ", doc);
          for (let i = 0; i < doc.length; i++) {
            let date = doc[i].date;
            let a = date.toJSON();
            let b = a.split("-");
            let c = parseInt(b[1]);
            arr[c - 1] += 1;
            console.log("a", a);
            console.log("b", b);
            console.log("c", c);
          }
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            arr: arr
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Doc not Found "
          });
        }
      }
    });
  },
  product(response) {
    orderModel.find({}, (err, doc) => {
      if (err) {
        console.log("Error in Record Add");
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Record Not Added Due to Error"
        });
      } else {
        if (doc) {
          console.log("doc", doc);

          var productarr = new Array();
          var farr = new Array();
          for (let i = 0; i < doc.length; i++) {
            for (let j = 0; j < doc[i].products.length; j++) {
              productarr.push({
                productid: doc[i].products[j].productid,
                qty: doc[i].products[j].qty
              });
            }
          }

          for (let i = 0; i < productarr.length; i++) {
            flag = 0;
            for (let j = 0; j < farr.length; j++) {
              if (productarr[i].productid == farr[j].productid) {
                farr[j].qty += productarr[i].qty;
                flag = 1;
              }
            }
            if (flag == 0) {
              farr.push({
                productid: productarr[i].productid,
                qty: productarr[i].qty
              });
            }
          }
          console.log("products", productarr, "farr", farr);
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            record: farr
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Doc not Found "
          });
        }
      }
    });
  }
};
module.exports = orderOperations;
