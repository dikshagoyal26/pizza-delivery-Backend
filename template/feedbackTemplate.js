function template(userid) {
  var str = `<h1>
  We're verifying a recent feedback from ${userid}:
</h1>

<p>Thanks,</p>

<p>Pizza Delivery</p>`;
  return str;
}
module.exports = template;
