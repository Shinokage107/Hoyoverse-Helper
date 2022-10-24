const fetch = require("node-fetch");
const ACT_ID = "e202102251931481";

module.exports = {
	genshinRequest: genshinRequest,
	checkDailyNotSigned: checkDailyNotSigned,
	checkCodes: checkCodes,
	redeemCodes: redeemCodes
}

async function genshinRequest(cookie, client, userId) {
	const data = await checkDailyNotSigned(cookie);
	if (data.signed == true) return;

	await DailySigned(cookie);
	const data2 = await checkDailyNotSigned(cookie);

	log = "unfinished business";
	if (data2.sign_cnt == data.sign_cnt) {
		log = (`Failed to sigh in, because traveler already sign`)
	}else{
		log = (`Your sign in is success, your total sign in is **${data2.sign_cnt} days **. \n U missed **${data2.sign_cnt_missed} days** :c`);
	}
	console.log(log);

	client.users.send(userId, log);
}

async function checkCodes(){
	const response = await fetch(`https://raw.githubusercontent.com/ataraxyaffliction/gipn-json/main/gipn-update.json`, {
			headers: {
				accept: "*/*",
			},
			referrerPolicy: "strict-origin-when-cross-origin",
			method: "GET",
			mode: "cors",
		});

		var codeList = [];
		const data = await response.json();
		for(const redeem of data.CODES){
			if(redeem.is_expired == false){
				codeList.push(redeem.code);
			}
		}
		console.log('Found non expired Codes ! ' + codeList);
		return codeList;
}

async function redeemCodes(cookie, client, discord_id, codes){

	if(codes != null){
		try{
			const acc = await getAccData(cookie);
			for(const code of codes){
				const response = await fetch(`https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey?uid=${acc.game_uid}&region=${acc.region}&lang=en&cdkey=${code}&game_biz=${acc.game_biz}`, {
				headers: {
					accept: "*/*",
					cookie: `${cookie}`,
				},
				referrer: "https://www.hoyolab.com/",
				referrerPolicy: "strict-origin-when-cross-origin",
				method: "GET",
				mode: "cors",
			});

			console.log(`https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey?uid=${acc.game_uid}&region=${acc.region}&lang=en&cdkey=${code}&game_biz=${acc.game_biz}`)
			const data = await response.json();
			console.log(data);
			}

		} catch (error) {
			console.log("check info failed with error: " + error);
			return false;
		}
		
	}
}

async function getAccData(cookie){
	try{
		const response = await fetch(`https://api-os-takumi.hoyoverse.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_global`, {
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

		return data.data.list[0];

	} catch (error) {
		console.log("check info failed with error: " + error);
		return false;
	}
	
}

async function checkDailyNotSigned(cookie) {
	try {
		const response = await fetch(`https://sg-hk4e-api.hoyolab.com/event/sol/resign_info?lang=en-us&act_id=${ACT_ID}`, {
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
		const response = await fetch(`https://sg-hk4e-api.hoyolab.com/event/sol/sign?lang=en-us`, {
			headers: {
				accept: "*/*",
				cookie: `${cookie}`,
			},
			body: `{"act_id":"${ACT_ID}"}`,
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

