function check_input_format(in_str) {
  let msg_str = in_str.match(/\u3010[a-z]+\u3011\n/);
  if (msg_str === null) {
    return false;
  }
  let msg_type = msg_str[0].slice(1, -2);
  if (msg_type == "msg") {
    let date_str = in_str.match(/<\u65f6\u95f4>[0-9]+-[0-9]+-[0-9]+\ [0-9]+:[0-9]+:[0-9]+\n/);
    let type_str = in_str.match(/<\u7c7b\u578b>((\u56fe\u7247)|(\u6587\u5b57)|(\u89c6\u9891)|(\u97f3\u9891))\n/);
    let text_str = in_str.match(/<\u6b63\u6587>\n[^.]+/);
    if (date_str === null || type_str === null || text_str === null) {
      return false;
    }
    return true;
  } else if (msg_type == "blog") {
    return false;
  }
  return false;
}

function date_format(date_str) {
  let date_format_str = date_str.slice(0, 10) + "T" + date_str.slice(11);
  let date = new Date(date_format_str);


  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  console.log(year);

  let res_str = `${year}-${month}-${day} ${hours}:${minutes}`;

  return res_str;
}

function gen_sns_text(in_str, text) {
  let msg_type = in_str.match(/\u3010[a-z]+\u3011\n/)[0].slice(1, -2);

  let date_str = in_str.match(/<\u65f6\u95f4>[0-9]+-[0-9]+-[0-9]+\ [0-9]+:[0-9]+:[0-9]+\n/)[0].slice(4, -1);
  let date_format_str = date_format(date_str);

  if (msg_type == "msg") {
    let res_str = `Message / ${date_format_str}\n${text}`;
    return res_str;
  } else if (msg_type == "blog") {
    let res_str = `Blog / ${date_format_str}\n`;
    return res_str;
  } else if (msg_type == "twitter") {
    let res_str = `Blog / ${date_format_str}`;
    return res_str;
  }
  return "";
}

let input_str = "【msg】\n<时间>2023-12-12 05:18:51\n<类型>图片\n<正文>\nshuile";
console.log(check_input_format(input_str));

let mole = gen_sns_text(input_str, "zhendejiade");
console.log(mole);

// msg_str = input_str.match(/\u3010[a-z]+\u3011\n/);
// date_str = input_str.match(/<\u65f6\u95f4>[0-9]+-[0-9]+-[0-9]+\ [0-9]+:[0-9]+:[0-9]+\n/);
// type_str = input_str.match(/<\u7c7b\u578b>((\u56fe\u7247)|(\u6587\u5b57)|(\u89c6\u9891)|(\u97f3\u9891))\n/);
// text_str = input_str.match(/<\u6b63\u6587>\n[^.]+/);

// console.log(msg_str[0].slice(1, -2));
// console.log(date_str[0].slice(4, -1));
// console.log(type_str[0].slice(4,-1));
// console.log(text_str[0].slice(5));

