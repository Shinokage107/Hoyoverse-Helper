# Hoyoverse Automatisation
A discord bot for automatic sign in. 

Currently it supports
- Genshin
- Honkai
- Tears of Themis

- Genshin Auto Code redeems

I did borrowed allot from some of the already existing solutions on github but merged it into a bot and a db that simply holds discord id + user cookie. 

### 1) Receiving Your Account Cookies
Instruction

1. I'm using Chrome browser, if you're using a different browser, some names may vary.
2. Copy the following code.
    ```
    var cookie=start();
    var ask=confirm('Cookie: '+cookie+'\n\nClick confirm to copy Cookie.');if(ask==true){copy(cookie);msg=cookie}else{msg='Cancel'}
    function start() {
        return "ltoken=" + getCookie("ltoken") + ";ltuid=" + getCookie("ltuid") + ";";
        function getCookie(name) {
            const value = ";" + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    }
    ```
3. Go to the daily sign in page of ur choice. 
4. [Genshin](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwj48vmej_v6AhU6gv0HHRa5AHoQFnoECBoQAQ&url=https%3A%2F%2Fact.hoyolab.com%2Fys%2Fevent%2Fsignin-sea-v3%2Findex.html%3Fact_id%3De202102251931481&usg=AOvVaw3j6wygLLVF0bTQvZIJH3_f), [Honkai](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwi57r7Kj_v6AhXhgP0HHcbMDP4QFnoECA4QAQ&url=https%3A%2F%2Fact.hoyolab.com%2Fbbs%2Fevent%2Fsignin-bh3%2Findex.html%3Fact_id%3De202110291205111&usg=AOvVaw1HC0BCsQYANQTX0DwYHuoX), [Tears of Themis](https://webstatic-sea.hoyoverse.com/bbs/event/signin/nxx/index.html?act_id=e202202281857121&bbs_presentation_style=fullscreen&bbs_auth_required=true&utm_source=hoyolab&utm_medium=web&campaign=post)
5. Right-click on the page and click on **View Code**, then click on the **Console** tab.
6. Paste the code you copied in the second paragraph and press **Enter**.
7. In the window that appears, click **Ok** and the necessary Cookies will be automatically copied to your clipboard. 

### 2) Receiving Your Account Cookies for Genshin Redeems
Instruction

1. For some reason for redeeming codes in Genshin the bot needs different cookies. U can get them through a similar way.
2. Copy the following code.
    ```
    var cookie=start();
    var ask=confirm('Cookie: '+cookie+'\n\nClick confirm to copy Cookie.');if(ask==true){copy(cookie);msg=cookie}else{msg='Cancel'}
    function start() {
        return "cookie_token=" + getCookie("cookie_token") + ";account_id=" + getCookie("account_id") + ";";
        function getCookie(name) {
            const value = ";" + document.cookie;
            const parts = value.split("; " + name + "=");
            if (parts.length === 2) return parts.pop().split(';').shift();
        }
    }
    ```
3. Now go to the official Genshin redeem page and login.  [Genshin Redeem site](https://genshin.hoyoverse.com/en/gift)
5. Right-click on the page and click on **View Code**, then click on the **Console** tab.
6. Paste the code you copied in the second paragraph and press **Enter**.
7. In the window that appears, click **Ok** and the necessary Cookies will be automatically copied to your clipboard. 

### 3) Feed the bot with ur cookies. 
Instruction

1. Use discord slashCommands to setup ur auto logins. 
2. Make sure each login has there correct cookie. In some cases people have different accounts/cookies for Honkai and Genshin
3. The cookie for Genshin daily login and Genshin code redeems are NOT THE SAME

### For any questions feel free to reach out to me Shino#8238
