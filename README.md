# hoyoLogin
A discord bot for automatic sign in. 

Currently it supports
- Genshin
- Honkai
- Tears of Themis

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
3. Go to https://www.hoyolab.com/genshin/ or to one of the other sides, then login.
4. Right-click on the page and click on **View Code**, then click on the **Console** tab.
5. Paste the code you copied in the second paragraph and press **Enter**.
6. In the window that appears, click **Ok** and the necessary Cookies will be automatically copied to your clipboard. 
