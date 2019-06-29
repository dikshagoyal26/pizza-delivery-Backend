const cartModel = require("../models/cart");
const appCodes = require("../../utils/appcodes");
const cartOperations = {
  add(cartObject, response) {
    cartModel.findOne({ userid: cartObject.userid }, (err, doc) => {
      if (err) {
        console.log("Error", err);

        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          this.update(cartObject, doc, response);
        } else {
          cartModel.create(cartObject, (err) => {
            if (err) {
              console.log("Error in Record Add", err);
              response.status(appCodes.SERVER_ERROR).json({
                status: appCodes.ERROR,
                message: "Record Not Added Due to Error"
              });
            } else {
              console.log("Record Added..");
              response
                .status(appCodes.OK)
                .json({ status: appCodes.SUCCESS, message: "Record Added" });
            }
          });
        }
      }
    });
  },
  update(cartObject, data, response) {
    console.log("cartObject is", cartObject);
    console.log("cartObject products is", cartObject.products[0].productid);
    var objFound_bool = false;

    for (let i = 0; i < data.products.length; i++) {
      if (data.products[i].productid == cartObject.products[0].productid) {
        console.log("doc found");
        data.products[i].name = cartObject.products[0].name;
        data.products[i].price = cartObject.products[0].price;
        data.products[i].toppings = cartObject.products[0].toppings;
        data.products[i].qty = cartObject.products[0].qty;
        data.products[i].total =
          parseInt(cartObject.products[0].qty) *
          parseInt(cartObject.products[0].price);
        // cartModel.updateOne();
        objFound_bool = true;
      }
    }
    if (!objFound_bool) {
      data.products.push(cartObject.products[0]);
    }
    console.log("data is", data);

    cartModel.findOneAndUpdate(
      { userid: cartObject.userid },
      { $set: data },
      { upsert: true },
      (err, doc) => {
        if (err) {
          console.log("Error in Record Update", err);
          response.status(appCodes.SERVER_ERROR).json({
            status: appCodes.ERROR,
            message: "Record not updated Due to Error"
          });
        } else {
          if (doc) {
            console.log("Record updated ");

            response.status(appCodes.OK).json({
              status: appCodes.SUCCESS,
              userid: doc.userid
            });
          } else {
            response.status(appCodes.RESOURCE_NOT_FOUND).json({
              status: appCodes.FAIL,
              message: "Invalid Details "
            });
          }
        }
      }
    );
  },
  deleteone(cartObject, response) {
    cartModel.findOne({ userid: cartObject.userid }, (err, data) => {
      if (err) {
        console.log("Error", err);

        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (data) {
          for (let i = 0; i < data.products.length; i++) {
            if (
              data.products[i].productid == cartObject.products[0].productid
            ) {
              data.products[i].splice(i, 1);
              break;
            }
          }
          cartModel.findOneAndUpdate(
            { userid: cartObject.userid },
            { $set: data },
            { upsert: true },
            (err, doc) => {
              if (err) {
                console.log("Error in Record Update", err);
                response.status(appCodes.SERVER_ERROR).json({
                  status: appCodes.ERROR,
                  message: "Record not updated Due to Error"
                });
              } else {
                if (doc) {
                  console.log("Record Deleted ");

                  response.status(appCodes.OK).json({
                    status: appCodes.SUCCESS,
                    userid: doc.userid
                  });
                } else {
                  response.status(appCodes.RESOURCE_NOT_FOUND).json({
                    status: appCodes.FAIL,
                    message: "Invalid Details "
                  });
                }
              }
            }
          );
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid Details "
          });
        }
      }
    });
  },
  deleteAll(cartObject, response) {
    cartModel.findOneAndRemove({ userid: cartObject.userid }, (err) => {
      if (err) {
        response.status(appCodes.RESOURCE_NOT_FOUND).json({
          status: appCodes.FAIL,
          message: "Error in record delete "
        });
      } else {
        console.log("Record Deleted");
        response.status(appCodes.OK).json({
          status: appCodes.SUCCESS,
          message: "Record Deleted"
        });
      }
    });
  },
  search(cartObject, response) {
    cartModel.find({ userid: cartObject.userid }, (err, doc) => {
      //match userid
      if (err) {
        response.status(appCodes.SERVER_ERROR).json({
          status: appCodes.ERROR,
          message: "Error in DB During Find Operation"
        });
      } else {
        if (doc) {
          response.status(appCodes.OK).json({
            status: appCodes.SUCCESS,
            message: "Welcome " + cartObject.userid,
            record: doc
          });
        } else {
          response.status(appCodes.RESOURCE_NOT_FOUND).json({
            status: appCodes.FAIL,
            message: "Invalid Data "
          });
        }
      }
    });
  }
};
module.exports = cartOperations;
