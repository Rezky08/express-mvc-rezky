const Response = require("../responses");
const User = require("../models/User");

const index = (req, res) => {
  User.find()
    .then((users) => {
      Response.ResponseFormatter.jsonResponse(
        res,
        Response.ResponseCode.RESPONSE_CODE.RC_SUCCESS,
        users
      );
    })
    .catch((err) => {
      Response.ResponseFormatter.jsonResponse(
        res,
        Response.ResponseCode.RESPONSE_CODE.RC_SUCCESS,
        err
      );
    });
};
const show = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      Response.ResponseFormatter.jsonResponse(
        res,
        Response.ResponseCode.RESPONSE_CODE.RC_SUCCESS,
        user
      );
    })
    .catch((err) => {
      Response.ResponseFormatter.jsonResponse(
        res,
        Response.ResponseCode.RESPONSE_CODE.RC_SUCCESS,
        err
      );
    });
};

const store = (req, res, next) => {
  try {
    const user = new User(req.body);
    user
      .save()
      .then((data) => {
        Response.ResponseFormatter.jsonResponse(
          res,
          Response.ResponseCode.RESPONSE_CODE.RC_SUCCESS,
          data
        );
      })
      .catch((err) => {
        Response.ResponseFormatter.invalidValidationResponse(err, res);
      });
  } catch (error) {
    next({
      error: error,
      code: Response.ResponseCode.RESPONSE_CODE.RC_INVALID_DATA,
      data: req.body,
    });
  }
};

const update = (req, res, next) => {
  try {
    User.findByIdAndUpdate(req.params.userId, req.body).then((user) => {
      Response.ResponseFormatter.jsonResponse(
        res,
        Response.ResponseCode.RESPONSE_CODE.RC_SUCCESS,
        user
      );
    });
  } catch (error) {
    next({
      error: error,
      code: Response.ResponseCode.RESPONSE_CODE.RC_INVALID_DATA,
      data: req.body,
    });
  }
};

const destroy = (req, res, next) => {
  try {
    User.findByIdAndRemove(req.params.userId).then((user) => {
      Response.ResponseFormatter.jsonResponse(
        res,
        Response.ResponseCode.RESPONSE_CODE.RC_SUCCESS,
        user
      );
    });
  } catch (error) {
    next({
      error: error,
      code: Response.ResponseCode.RESPONSE_CODE.RC_INVALID_DATA,
      data: req.body,
    });
  }
};
module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
