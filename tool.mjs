import puppeteer from "puppeteer";
import Tesseract from "tesseract.js";
import fs from "fs";
let page;
let browser;

let href;
let hrefs;
let page1
let element;
let vocabularyHrefs
async function main() {
    try {

        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            // devtools: true
        })


        page = await browser.newPage()
        await page.goto('https://eop.edu.vn/login')
        await page.type(`input[type="text"].form-control[spellcheck="false"][title="Nhập tên tài khoản"][maxlength="100"][placeholder="Mã sinh viên"]#input-username`, "2022606264")
        await page.type(`input[type="password"].form-control[title="Nhập vào mật khẩu"][maxlength="100"][placeholder="******"]#input-password`, "Thao@2004!")
        await page.click(`button.btn.btn-success.btn-block#login-btn`)
        await page.waitForTimeout(500)

        const changeUnitByTitle = async (title) => {
            page = await browser.newPage();
            await page.goto('https://eop.edu.vn/study/branch/91')
            await page.click(`a[title="Tiếng Anh Điện - Điện tử cơ bản 4 V2-FL6133_2"`)
            await page.click('i.fa.flaticon-persons8')
            element = await page.$(`[title="${title}"]`);
            href = await element.evaluate(node => node.getAttribute('href'));
            await page.goto(`https://eop.edu.vn/${href}`)
            hrefs = await page.$$eval('.dpop', links => links.map(link => link.getAttribute('href')));
            vocabularyHrefs = hrefs.map((e) => {
                return `https://eop.edu.vn${e}`
            })
            fs.appendFileSync('./CONVERT.txt', `await changeUnitByTitle('${title}')\n \n`)
            page1 = await browser.newPage()
            await page1.goto(vocabularyHrefs[0])

        }
        const doClickBtn = async (url) => { // dùng cho bài chỉ ấn nút hoàn thành , không đối số
            // await page1.waitForTimeout(2000)
            await page1.waitForSelector('button.btn.btn-info.dnut')
            await page1.waitForTimeout(2000)
            await page1.click("button.btn.btn-info.dnut")
            fs.appendFileSync('./CONVERT.txt', `await doClickBtn()\n \n`)
            await page1.waitForTimeout(8000)
        }
        // const observer = new MutationObserver(mutationsList => {
        //     // Kiểm tra mỗi mutation
        //     mutationsList.forEach(mutation => {
        //         // Kiểm tra nếu có thêm nodes mới vào DOM
        //         if (mutation.type === 'childList') {
        //             // Kiểm tra xem có phần tử mong muốn không
        //             const targetElement = document.querySelector('body > div.dboxy.fixed > div > div > b.dbxclo > i');
        //             if (targetElement) {
        //                 // Nếu phần tử tồn tại, thực hiện click
        //                 targetElement.click();
        //                 // Dừng quan sát sau khi thực hiện click
        //                 observer.disconnect();
        //             }
        //         }
        //     });
        // });

        // // Bắt đầu quan sát các thay đổi trong DOM
        // observer.observe(document.body, { childList: true, subtree: true });
        // browser.on("targetcreated", async (target) => {
        //     const page1 = await target.page();
        //     if (page1) {
        //         await page1.close()
        //         count--
        //         return
        //         // await page.waitForTimeout(3000)
        //     }
        // });
        const doGotoUrlForOneTesting = async (url) => {
            await page1.waitForTimeout(2000)
            await page1.goto(url)
            await page1.waitForTimeout(8000)
        }

        const doFillDinline = async (answers) => {//dùng cho bài điền ,  đối số nhận vào là đáp án đúng
            //await page1.waitForTimeout(2000)
            // Truyền answers và count vào hàm evaluate bằng tham số
            await page1.waitForSelector('input.danw.dinline')
            await page1.evaluate((answers) => {
                const inputs = document.querySelectorAll('input.danw.dinline');
                inputs.forEach((input, index) => {
                    // Sử dụng index để truy cập vào mảng answers
                    input.value = answers[index];
                });
            }, answers);
            await page1.waitForTimeout(1000)
            await page1.click("button.btn.btn-info.dnut")
            try {
                await page1.waitForTimeout(500)
                await page1.click('body > div.dboxy.fixed > div > div > b.dbxclo > i')
                await page1.waitForTimeout(200)

                await page1.click("#submit816b6814ba")
            } catch (error) {
                console.log('-');
            } // 
            await page1.waitForTimeout(8000)
        }


        const doListeningPlayBtn = async () => { // dùng cho bài vacabulary ấn nút play , hàm này không cần đối số
            // await page1.waitForTimeout(1000)
            await page1.waitForSelector('.fa.fa-play-circle.daudio')
            const elements = await page1.$$('.fa.fa-play-circle.daudio');
            // await page1.waitForTimeout(1000)
            for (let element of elements) {
                await element.click();
            }
            // await page1.waitForSelector('button.btn.btn-info.dnut')
            await page1.waitForTimeout(2000)

            await page1.click("button.btn.btn-info.dnut")
            fs.appendFileSync('./CONVERT.txt', `await doListeningPlayBtn()\n \n`)
            await page1.waitForTimeout(8000)
        }

        const doSortWordsNew = async (quantity) => { // truyền vào số lượng task chứa từ vựng ---- nhiều task thuộc dạng này chứa từ nằm ngoài từ vựng ở vocabulary thì ae để ý phần terminal (là phần được mở lên bằng phím ctrl + ` ) tôi đã in ra những đáp án có tồn tại trong vocabulary, còn những đáp án không tồn tại sẽ in ra phiên âm
            let check = true
            let arrTrue = []
            const indexTrue = []
            const contents = []
            let counterIndex = 0
            const myMap = new Map()
            // await page1.waitForTimeout(2000)
            await page1.waitForSelector('p.title')
            const IPASTASK = await page1.$$eval('p.title', elements => elements.map(element => element.textContent));
            for (let i = 0; i < quantity; i++) {
                let page3 = await browser.newPage()
                await page3.goto(vocabularyHrefs[i]);
                // await page3.waitForTimeout(7000);
                await page3.waitForSelector('h4')
                const words = await page3.$$eval('h4', elements => elements.map(element => element.textContent.trim()));
                const IPASUNIT = await page3.evaluate(() => {
                    const elements = document.querySelectorAll('div.minhhoa > i');
                    const contents = [];
                    elements.forEach(element => {
                        contents.push(element.innerHTML);
                    });
                    return contents;
                });
                for (let i = 1; i < words.length; i++) {
                    myMap.set(IPASUNIT[i], words[i].toUpperCase())
                }
                await page3.close()
            }
            for (let i = 0; i < IPASTASK.length; i++) {
                if (!myMap.get(IPASTASK[i])) {
                    console.log(`phiên âm này không chứa trong vocabulary : `, IPASTASK[i]);
                    check = false
                }
                arrTrue.push(myMap.get(IPASTASK[i]))
            }
            let arrWords = arrTrue
            console.log("mảng đáp án đúng là (nếu mảng chứa undefined hoặc null thì ae tra phiên âm rồi dùng hàm sortWord cũ , nhớ copy phần in ra dưới đây cho nhanh) : ");
            console.log(arrWords);
            if (!check) {
                fs.appendFileSync('./CONVERT.txt', `await doSortWords(${JSON.stringify(arrWords)})\n \n`)
                return
            }
            arrTrue = arrTrue.map((e) => {
                return e.split("")
            }).flat(100)
            const divsInLi = await page1.$$('li > div');
            for (let index = 0; index < divsInLi.length; index++) {
                let content = await page1.evaluate(div => div.textContent, divsInLi[index]);
                contents.push(content)
            }
            for (let i = 0; i < arrTrue.length; i++) {
                for (let j = 0; j < contents.length; j++) {
                    if (arrTrue[i] == contents[j] && !indexTrue.includes(j)) {
                        indexTrue.push(j)
                        break;
                    }
                }
            }
            // console.log(myMap);
            //console.log(arrWords);
            // console.log(contents);
            // console.log(indexTrue);
            fs.appendFileSync('./CONVERT.txt', `await doSortWords(${JSON.stringify(arrWords)})\n \n`)
            for (let i = 0; i < arrWords.length; i++) {
                for (let j = counterIndex; j < counterIndex + arrWords[i].length; j++) {
                    await divsInLi[indexTrue[j]].click()
                    // await page1.waitForTimeout(3000)
                }
                counterIndex += arrWords[i].length
                await page1.waitForTimeout(3000)
            }
            await page1.waitForTimeout(8000)
        }

        const doFillAll = async () => {
            const getText = async (base64) => {
                let myText
                const scanText = async () => {
                    try {
                        const { data: { text } } = await Tesseract.recognize(
                            "./image.png",
                            'eng'
                        );
                        myText = text
                    } catch (error) {
                        console.error(error);
                    }
                };
                fs.writeFileSync('image.png', base64, { encoding: 'base64' }, function (err) {
                    console.log('File created');
                });

                await scanText()
                fs.unlinkSync('./image.png')
                return myText
            }
            let answers = []
            // await page1.waitForTimeout(2000)
            await page1.waitForSelector('input.danw.dinline')
            const inputs = await page1.$$('input.danw.dinline')
            for (let index = 0; index < inputs.length; index++) {
                await inputs[index].type("trâu cày eop")
                await page1.waitForTimeout(1000)
            }
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(28000 - 1000 * (inputs.length - 4))
            await page1.waitForTimeout(3000)
            await page1.click('button.btn.dnut.btn-danger')
            await page1.waitForTimeout(2000)
            for (let index = 0; index < inputs.length; index++) {
                const backgroundImage = await page1.evaluate(element => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.getPropertyValue('background-image');
                }, inputs[index]);
                let base64 = backgroundImage.replace(`url("data:image/png;base64,`, "").replace(`")`, "")
                let answer = await getText(base64)
                // console.log(answer);
                answers.push(answer)
            }
            let save = []
            for (let index = 0; index < answers.length; index++) {//vòng lặp custom
                answers[index] = answers[index].replace("\n", "")
                if (answers[index].includes("|")) {
                    answers[index] = answers[index].replaceAll("|", "I")
                }
                if (answers[index] == "Cc") {
                    answers[index] = "C"
                }
                if (answers[index] == "") {
                    answers[index] = "I"
                }
                if (answers[index].includes('tum')) {
                    answers[index] = answers[index].replaceAll('tum', "turn")
                }

                if (answers[index].includes('Ss')) {
                    answers[index] = answers[index].replaceAll('Ss', "S")
                }
                if (answers[index].includes('southem')) {
                    answers[index] = answers[index].replaceAll('southem', "southern")
                }
                if (answers[index].includes('afew')) {
                    answers[index] = answers[index].replaceAll('afew', "a few")
                }
                if (answers[index].includes('alittle')) {
                    answers[index] = answers[index].replaceAll('alittle', "a little")
                }
                if (answers[index].includes('modem')) {
                    answers[index] = answers[index].replaceAll('modem', "modern")
                }
                if (answers[index].includes('comer')) {
                    answers[index] = answers[index].replaceAll('comer', "corner")
                }
                if (answers[index] == "anp") {
                    answers[index] = "grip"
                }
                if (answers[index] == "ry") {
                    answers[index] = "try"
                }
                if (answers[index].includes("itis")) {
                    answers[index] = answers[index].replaceAll("itis", "it is")
                }

                if (answers[index].includes("auturnn")) {
                    answers[index] = answers[index].replaceAll("auturnn", "autumn")
                }
                if (answers[index].includes("‘You")) {
                    answers[index] = answers[index].replaceAll("‘You", "You")
                }
                if (answers[index].length > 5 && answers[index].includes(" 1 ")) {
                    answers[index] = answers[index].replaceAll(" 1 ", " I ")
                }
                if (answers[index].includes("inthe")) {
                    answers[index] = answers[index].replaceAll("inthe", "in the")
                }
                if (answers[index].includes("moming")) {
                    answers[index] = answers[index].replaceAll("moming", "morning")
                }
                if (answers[index].match(/in\d{4}/g)) {
                    answers[index] = answers[index].replace(/in\d{4}/g, match => "in " + match.slice(2));
                }
                // if (answers[index].match(/[a-zA-Z]\d/g)) {
                //     answers[index] = answers[index].replace(/[a-zA-Z](\d)/g, (match, group1) => match.slice(0, 1) + ' ' + group1);
                // }
                // if (answers[index].match(/\d[a-zA-Z]/g)) {
                //     answers[index] = answers[index].replace(/(\d)[a-zA-Z]/g, (match, group1) => group1 + ' ' + match.slice(1));
                // }
                if (answers[index].includes("amap ")) {
                    answers[index] = answers[index].replaceAll("amap ", "a map ")
                }
                if (answers[index].includes("checkin")) {
                    answers[index] = answers[index].replaceAll("checkin", "check in")
                }

                if (answers[index].includes("turnon")) {
                    answers[index] = answers[index].replaceAll("turnon", "turn on")
                }
                if (answers[index].includes("Fora")) {
                    answers[index] = answers[index].replaceAll("Fora", "For a")
                }

                if (answers[index].includes("Itis")) {
                    answers[index] = answers[index].replaceAll("Itis", "It is")
                }
                // if (answers[index].includes("'")) {
                //     answers[index] = answers[index].replaceAll("'", "´")
                // }
                if (answers[index] == "amap") {
                    answers[index] = "a map"
                }
                if (answers[index] == "arag") {
                    answers[index] = "a rag"
                }
                if (answers[index] == "un") {
                    answers[index] = "run"
                }
                if (answers[index].includes('1"')) {
                    answers[index] = answers[index].replaceAll('1"', "11")
                }
                if (answers[index].includes(" am.")) {
                    answers[index] = answers[index].replaceAll(" am.", " a.m")
                }

                if (answers[index].includes("‘W")) {
                    answers[index] = answers[index].replaceAll("‘W", "W")
                }
                if (answers[index].includes("aresult")) {
                    answers[index] = answers[index].replaceAll("aresult", "a result")
                }
                if (answers[index].includes("itsells")) {
                    answers[index] = answers[index].replaceAll("itsells", "it sells")
                }
                if (answers[index].includes("alot")) {
                    answers[index] = answers[index].replaceAll("alot", "a lot")
                }
                if (answers[index].includes("goon")) {
                    answers[index] = answers[index].replaceAll("goon", "go on")
                }
                if (answers[index].includes("aflas")) {
                    answers[index] = answers[index].replaceAll("aflas", "a flas")
                }
                if (answers[index].includes("iton")) {
                    answers[index] = answers[index].replaceAll("iton", "it on")
                }
                if (answers[index].includes("P 67")) {
                    answers[index] = answers[index].replaceAll("P 67", "IP 67")
                }
                if (answers[index].includes("Asales")) {
                    answers[index] = answers[index].replaceAll("Asales", "A sales")
                }
                save.push(answers[index])
            }
            console.log(save)
            await page1.click("button.btn.dnut.btn-primary")
            fs.appendFileSync('./CONVERT.txt', `await doFillDinline(${JSON.stringify(save)})\n \n`)
            for (let i = 0; i < inputs.length; i++) {
                await inputs[i].type(answers[i])
                await page1.waitForTimeout(200)
            }
            // await page1.waitForTimeout(1000)
            await page1.click("button.btn.btn-info.dnut")
            try {
                await page1.waitForTimeout(500)
                await page1.click('body > div.dboxy.fixed > div > div > b.dbxclo > i')
                await page1.waitForTimeout(1500)
                await page1.click("#submit816b6814ba")
                await page1.waitForTimeout(1500)
                await page1.click("#submit816b6814ba")

            } catch (error) {
                console.log('-');
            } // click vào nút hoàn thành
            await page1.waitForTimeout(8000)
        }


        const doClickHearing2 = async (index) => { // truyền vào số 0
            const run = async (index, elements) => { // hàm này k cần quan tâm (chỉ để bổ trọ cho hàm clickHearing2)
                for (let i = 0; i < elements.length; i++) {
                    console.log("index : ", index, "length : ", elements.length);
                    let isClickable
                    try {
                        isClickable = await elements[index].isIntersectingViewport();
                    } catch (error) {
                        console.log("done!");
                        return
                    }
                    if (isClickable) {
                        try {
                            console.log("click dc");
                            await elements[index].click()
                            index++
                            await page1.waitForTimeout(4200)
                        }
                        catch (err) {
                            await run(index, elements)
                        }
                    } else {
                        console.log("khong click dc");
                        index++
                    }
                }
            }

            // await page1.waitForTimeout(2000)
            await page1.waitForSelector('.dtitle')
            const elements = await page1.$$('.dtitle');
            await run(index, elements)
            fs.appendFileSync('./CONVERT.txt', `await doClickHearing2(0)`)
            await page1.waitForTimeout(8000)
        }

        const doSortWords = async (arrTrue) => { // truyền vào mảng từ đúng
            let counterIndex = 0
            let arrWords = arrTrue
            arrTrue = arrTrue.map((e) => {
                return e.split("")
            }).flat(100)

            // await page1.waitForTimeout(2000)
            await page1.waitForSelector('li > div')
            const divsInLi = await page1.$$('li > div');
            const indexTrue = []
            const contents = []
            for (let index = 0; index < divsInLi.length; index++) {
                let content = await page1.evaluate(div => div.textContent, divsInLi[index]);
                contents.push(content)

            }
            for (let i = 0; i < arrTrue.length; i++) {
                for (let j = 0; j < contents.length; j++) {
                    if (arrTrue[i] == contents[j] && !indexTrue.includes(j)) {
                        indexTrue.push(j)
                        break;
                    }
                }
            }
            console.log(contents);
            console.log(indexTrue);
            for (let i = 0; i < arrWords.length; i++) {
                for (let j = counterIndex; j < counterIndex + arrWords[i].length; j++) {
                    await divsInLi[indexTrue[j]].click()
                    // await page1.waitForTimeout(3000)
                }
                counterIndex += arrWords[i].length
                await page1.waitForTimeout(3000)
            }
            await page1.waitForTimeout(8000)
        }

        const doCheckBoxNeww = async (quantity) => {//điền số lượng đáp án 1 câu vào đây
            const runCheckBox = async (labels, ids) => {
                for (let j = 0; j < labels.length; j++) {
                    // await page1.waitForTimeout(500)
                    let label = await page1.$(`label[for="${ids[j]}"]`);
                    let styleValue = await page1.evaluate(label => label.getAttribute('style'), label);
                    if (styleValue == "color: red;") {
                        await labels[j - 1].click()
                    }
                }
                await page1.click("button.btn.btn-info.dnut")
                await page1.waitForTimeout(3000)
            }
            // await page1.waitForTimeout(2000)
            await page1.waitForSelector('input[type="radio"].deck')
            const ids = await page1.$$eval('input[type="radio"].deck', inputs => inputs.map(input => input.id));
            const es = await page1.$$('input.deck[type="radio"]');
            const labels = [];
            for (let i = 0; i < es.length; i++) {
                const label = await page1.$(`label[for="${ids[i]}"]`);
                labels.push(label)
            }
            for (let i = 0; i < es.length; i++) {
                await labels[i].click()
            }
            await page1.waitForTimeout(1000)

            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(2000)
            for (let i = 0; i < quantity - 1; i++) {
                try {
                    await runCheckBox(labels, ids)
                } catch (error) {
                    console.log(error);
                }
            }
            fs.appendFileSync('./CONVERT.txt', `await doCheckBoxNeww(${quantity})\n \n`)
            await page1.waitForTimeout(8000)
        }


        const doWhenDoLastTaskUnit = async () => {
            // await page1.waitForTimeout(3000)
            await page1.waitForSelector('button.btn.btn-info.dnut')
            await page1.click("button.btn.btn-info.dnut") // click vào nút hoàn thành
            await page1.waitForTimeout(3000)
            await page1.close() // để làm task trên unit
            await page.close() // mở unit mới
        }

        const doFillabc = async () => { // không cần điền gì cả
            const runFillABC = async (inputs, W) => {
                for (let j = 0; j < inputs.length; j++) {
                    let input = inputs[j]
                    //  await page1.waitForTimeout(500)
                    let styleValue = await page1.evaluate(input => input.getAttribute('style'), input);
                    if (!styleValue.includes("color: green;")) {
                        await input.click();
                        await page1.keyboard.press('ArrowRight')
                        await page1.keyboard.press('ArrowRight')
                        await page1.keyboard.press('ArrowRight')
                        await page1.keyboard.press('ArrowRight')
                        await page1.keyboard.press('ArrowRight')
                        await page1.keyboard.press('ArrowRight')
                        await page1.keyboard.press('Backspace')
                        await page1.keyboard.press('Backspace')
                        await page1.keyboard.press('Backspace')
                        await page1.keyboard.press('Backspace')
                        await page1.keyboard.press('Backspace')
                        await page1.keyboard.press('Backspace')
                        await input.type(W)
                    }
                }
                await page1.click("button.btn.btn-info.dnut")
                await page1.waitForTimeout(2000)
            }
            let abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
            // await page1.waitForTimeout(3000)
            await page1.waitForSelector('.danw.dinline')
            let inputs = await page1.$$('.danw.dinline')
            console.log(inputs.length);
            for (let index = 0; index < inputs.length; index++) {
                await inputs[index].type('a')
            }
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(3000)
            for (let i = 0; i < inputs.length + 2; i++) {
                try {
                    await runFillABC(inputs, abc[i + 1])
                } catch (error) {
                    console.log(error);
                }
            }
            fs.appendFileSync('./CONVERT.txt', `await doFillabc()\n \n`)
            await page1.waitForTimeout(8000)
        }

        const doSortSound = async (quantity) => {
            let check = true
            let arrTrue = []
            const indexTrue = []
            const contents = []
            let counterIndex = 0
            const myMap = new Map()
            // await page1.waitForTimeout(2000)
            await page1.waitForSelector('i.fa.daudio')
            const MP3TASK = await page1.$$eval('i.fa.daudio', elements => {
                return elements.map(element => element.getAttribute('media-url')).filter(mediaUrl => mediaUrl);
            });
            for (let i = 0; i < quantity; i++) {
                let page3 = await browser.newPage()
                await page3.goto(vocabularyHrefs[i]);
                console.log(vocabularyHrefs[i]);
                // await page3.waitForTimeout(4000);
                await page3.waitForSelector('h4')
                const words = await page3.$$eval('h4', elements => elements.map(element => element.textContent.trim()));
                const MP3UNIT = await page3.$$eval(`.fa.fa-play-circle.daudio`, eles => eles.map(ele => { return ele.getAttribute('media-url') }));
                for (let i = 0; i < words.length; i++) {
                    myMap.set(MP3UNIT[i], words[i].toUpperCase())
                }
                await page3.close()
            }
            for (let i = 0; i < MP3TASK.length; i++) {
                if (!myMap.get(MP3TASK[i])) {
                    console.log(`phiên âm này không chứa trong vocabulary : `, MP3TASK[i]);
                    check = false
                }
                arrTrue.push(myMap.get(MP3TASK[i]))
            }
            let arrWords = arrTrue
            console.log("mảng đáp án đúng là (nếu mảng chứa undefined hoặc null thì ae tra phiên âm rồi dùng hàm sortWord cũ , nhớ copy phần in ra dưới đây cho nhanh) : ");
            console.log(arrWords);
            if (!check) {
                fs.appendFileSync('./CONVERT.txt', `await doSortWords(${JSON.stringify(arrWords)})\n \n`)
                return
            }
            arrTrue = arrTrue.map((e) => {
                return e.split("")
            }).flat(100)
            const divsInLi = await page1.$$('li > div');
            for (let index = 0; index < divsInLi.length; index++) {
                let content = await page1.evaluate(div => div.textContent, divsInLi[index]);
                contents.push(content)
            }
            for (let i = 0; i < arrTrue.length; i++) {
                for (let j = 0; j < contents.length; j++) {
                    if (arrTrue[i] == contents[j] && !indexTrue.includes(j)) {
                        indexTrue.push(j)
                        break;
                    }
                }
            }
            // console.log(myMap);
            //console.log(arrWords);
            // console.log(contents);
            // console.log(indexTrue);
            fs.appendFileSync('./CONVERT.txt', `await doSortWords(${JSON.stringify(arrWords)})\n \n`)
            for (let i = 0; i < arrWords.length; i++) {
                for (let j = counterIndex; j < counterIndex + arrWords[i].length; j++) {
                    await divsInLi[indexTrue[j]].click()
                    // await page1.waitForTimeout(3000)
                }
                counterIndex += arrWords[i].length
                await page1.waitForTimeout(3000)
            }
            await page1.waitForTimeout(8000)


        }
        const controler = async () => {
            // await page1.waitForTimeout(2000)
            await page1.waitForSelector('#mbody > div')
            const classTask = await page1.evaluate(() => {
                const closestChildDiv = document.querySelector('#mbody > div');
                return closestChildDiv.className;
            });
            console.log(classTask);
            if (classTask == "dvocabulary default") {
                await doListeningPlayBtn()
                return
            }
            if (classTask.includes('dmcq') && classTask.includes('-choose-')) {
                await doClickHearing2(0)
                return
            }
            if (classTask == "dmcq pronunciation-write-word") {
                await doSortWordsNew(1)
                return
            }
            if (classTask == "dmcq audio-write-word") {
                await doSortSound(1)
                return
            }
            if (classTask.includes("fill")) {
                try {
                    let element = await page1.$('#mbody > div > div > div.dhelp > h1 > strong')
                    let content = await element.evaluate((e) => { return e.textContent })
                    console.log(content);
                    if (content.includes('Match')) {
                        await doFillabc()
                        return
                    }
                } catch (error) {
                    console.log(' ');
                }

                await doFillAll()
                return
            }
            if (classTask == "dcontent view-content") {
                await doClickBtn()
                return
            }
            if (classTask.includes("dquestion") && classTask.includes("choose-")) {
                await doCheckBoxNeww(4)
            }
            if (classTask == "dcontent upload-content") {
                await doClickBtn()
                await doWhenDoLastTaskUnit()
                return
            }
        }
        const excute = async () => {
            while (true) {
                try {
                    await controler()
                } catch (error) {
                    console.log(error);
                }
            }
        }
        await changeUnitByTitle('UNIT 8: PROJECT PRESENTATION')

        await doListeningPlayBtn()

        // await doClickHearing2(0)
        // await doClickHearing2(0)
        // await doClickHearing2(0)
        // await doClickHearing2(0)
        await controler()
        // await doSortWords(["EFFICIENCY", "ESTIMATE", "TROUBLE REPORT", "INSPECT", "EMERGENCY ELECTRICITY GENERATOR", "EXPECT", "SET DEADLINE", "FORESEE", "OCCUR", "HANDLE", "LAUNCH", "MEET THE DEADLINE", "PURCHASE", "BUDGET", "WIFI ROUTER", "BREAK DOWN", "BACK-UP PLAN", "ELECTRICAL BLACKOUT"])

        await doFillDinline(["down", "expect", "handle", "operate", "suggest", "overheads", "launched", "electrical", "design", "estimate"])

        await doClickBtn()

        await doFillDinline(["will send", "are going to", "will have", "install", "will be", "will be set", "needs", "will", "will", "will complete"])

        await doFillDinline(["D", "D", "B", "A", "C", "A", "D"])

        await doFillDinline(["4", "1", "1", "2", "2", "3", "2", "2", "4", "3"])


        await doFillDinline(["C", "B", "D", "C", "A", "B"])

        await doFillDinline(["B - tougher", "B - cheapest", "C - more", "C - batteries", "C - narrower", "D-a", "C - flow", "B- part", "C - talk", "B - current"])

        await doFillDinline(["heat", "thickness", "Temperature", "problems", "operation"])

        await doFillDinline(["wire", "heat", "maximum", "quality", "volts", "applications", "high temperature", "inefficiencies"])

        await doFillDinline(["circuit board", "component", "Clamp", "flat", "3", "top"])

        await doFillDinline(["preparing", "circuit board", "clamp", "wires", "flat"])


        await doFillDinline(["15", "270", "superconducting", "30", "connected"])

        await doFillDinline(["liquid", "super", "conductive", "protons", "open", "shock"])

        await doFillDinline(["A smart goal", "5", "cool ideas", "action plan", "Idea generation, goal setting, the action plan, take persistent action"])

        await doFillDinline(["F", "T", "T", "F", "T"])

        await doFillDinline(["B", "A", "A", "C", "B"])

        await doFillDinline(["B", "D", "C", "A", "D"])

        await doFillDinline(["Refrigerant", "pipes", "evaporator", "under high pressure", "second fan"])

        await doFillDinline(["T", "F", "F", "F", "T"])

        await doFillDinline(["A", "C", "A", "B", "A", "B"])

        await doFillDinline(["is setting up", "will", "have", "are", "need", "require"])

        await doFillDinline(["For specific, on 20th of October, I will measure the size of these bathrooms and purchase tools.", "For the next three days, the project will be launched, the control board and bulbs will be installed.", "The last day is for inspecting and fixing (if necessary) and making trouble report", "For this project, three problems are predicted: shortage of money, lack of water and electrical blackout", "So I have some solutions like preparing back up money (500%), supplying water pump and emergency electricity generator."])

        await doClickBtn()








    } catch (error) {
        console.log(error);
    }


}
const ex = async () => {
    while (true) {
        try {
            await main()

        } catch (error) {
            await browser.close()
            await main()
        }
    }
}
//ex()
main()