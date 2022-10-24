const fetch = require("node-fetch");
const ACT_ID = "e202202281857121";

module.exports = {
	totRequest: totRequest,
	checkDailyNotSigned: checkDailyNotSigned
}

async function totRequest(cookie, client, userId) {
	const data = await checkDailyNotSigned(cookie);
	if (data.is_sign == true) return;

	await DailySigned(cookie);
	const data2 = await checkDailyNotSigned(cookie);

	log = "unfinished business";
	if (data2.total_sign_day == data.total_sign_day) {
		log = (`Failed to sigh in, because already sign`)
	}else{
		log = (`Your sign in is success, your total sign in is ${data2.total_sign_day}`);
	}
	console.log(log);

	client.users.send(userId, log);
}

async function checkDailyNotSigned(cookie) {
	try {
		const response = await fetch(`https://sg-public-api.hoyolab.com/event/luna/os/info?lang=en-us&act_id=${ACT_ID}`, {
			headers: {
				accept: "*/*",
				cookie: `${cookie}`,
			},
			referrer: "https://www.hoyolab.com/",
			referrerPolicy: "strict-origin-when-cross-origin",
			method: "GET",
			mode: "cors",
		});

		const data = await response.json();
		if (data.data == null) throw data.message;

		return data.data;
	} catch (error) {
		console.log("check info failed with error: " + error);
		return false;
	}
}

async function DailySigned(cookie) {
	try {
		const response = await fetch(`https://sg-public-api.hoyolab.com/event/luna/os/sign`, {
			headers: {
				accept: "*/*",
				cookie: `${cookie}`,
			},
			body: `{"act_id":"${ACT_ID}"}, "lang: "en-us"}`,
			referrer: "https://www.hoyolab.com/",
			referrerPolicy: "strict-origin-when-cross-origin",
			method: "POST",
			mode: "cors",
		});

		const data = await response.json();
		if (data.data == null) throw data.message;
		console.log(data);
		// return data.data.is_sign;
	} catch (error) {
		console.log("check info failed with error: " + error);
		return false;
	}
}

