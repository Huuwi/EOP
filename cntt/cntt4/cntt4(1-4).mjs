import puppeteer from "puppeteer";
import Tesseract from "tesseract.js";
import fs from "fs";
let page;
let browser;

let href;
let hrefs;
let page1
let element;

let a, b, c, d, e, f, g, h, j, k;
async function main() {
    try {

        browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
        })


        page = await browser.newPage()
        await page.goto('https://eop.edu.vn/login')
        await page.type(`input[type="text"].form-control[spellcheck="false"][title="Nhập tên tài khoản"][maxlength="100"][placeholder="Mã sinh viên"]#input-username`, "2022607411")
        await page.type(`input[type="password"].form-control[title="Nhập vào mật khẩu"][maxlength="100"][placeholder="******"]#input-password`, "Trang@010304")
        await page.click(`button.btn.btn-success.btn-block#login-btn`)
        await page.waitForTimeout(500)



        //THIS IS UNIT1-TACB4
        //THIS IS UNIT1-TACB4
        //THIS IS UNIT1-TACB4
        //unit1

        //Ham lay id data
        let scrapling = async () => {
            const data = await page1.$$eval('input[class="deck"]', elements =>
                elements.map(element => element.getAttribute('id')));
            return data;
        }


        //close and open pair 
        const closePages = async () => {
            await page1.waitForTimeout(5000);
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(2000);
            await page1.close();
            await page.close();
        }
        const walkThrough = async (title) => {
            page = await browser.newPage();
            await page.goto('https://eop.edu.vn/study/branch/17')
            await page.click(`a[title="Tiếng anh Công nghệ thông tin cơ bản 4-FL6088"] > p > b`)
            await page.click('i.fa.flaticon-persons8')
            element = await page.$(`[title="${title}"]`);
            href = await element.evaluate(node => node.getAttribute('href'));
            await page.goto(`https://eop.edu.vn/${href}`)
            hrefs = await page.$$eval('.dpop', links => links.map(link => link.getAttribute('href')));
            let vocabularyHrefs = hrefs.map((e) => {
                return `https://eop.edu.vn${e}`
            })
            page1 = await browser.newPage()
            await page1.goto(vocabularyHrefs[0])

        }
        //=======================

        const doVocabularyButtons = async () => { // dùng cho bài ấn nút play , hàm này không cần đối số
            await page1.waitForTimeout(2000)
            const elements = await page1.$$('.fa.fa-play-circle.daudio');
            await page1.waitForTimeout(2000)
            for (let element of elements) {
                await element.click();
            }
            await page1.waitForTimeout(2000)
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(10000)
        }

        const testingByUrl = async (url) => {
            await page1.waitForTimeout(2000)
            await page1.goto(url)
            await page1.waitForTimeout(8000)
        }


        const doCheckBox = async (arrTrue) => { // bài này dùng cho checkbox , 1-A , 2:B , 3 -C , đối số nhận vào là đáp án đúng
            let answers = ['chk_879fb036880969b30cccd23864ffb047', 'chk_ecea75c8a732e60a4296df05fd2d21fd', 'chk_999c51a2380fe0c96d3ec9523a0907d8', 'chk_d86c0ce1065781501d510ec509fb1e90', 'chk_fe45897650bcf550c9defc4520ab3313', 'chk_ac18ecedc6a1a71b26568c53ae5c0e62', 'chk_d14d1ee490010de101c847bbe5b69e95', 'chk_e68dc4981c2310e883786e7f723fa37d', 'chk_d7207860598dc597770e93d8b42b44dd', 'chk_fc721c1b9e22384e1bae7ad5557f5662', 'chk_05f9be08a7893f00515b7c27aa125016', 'chk_c855c78f36d540891bf6ecb301bb3f18', 'chk_9662e1566c6cd53c97d30a0cd48af0f8', 'chk_56f60ab718bafb623098a2e8cd576c73', 'chk_9951145db4d446ec7ace1fd924468dac', 'chk_f6c133924af9a1fee113960ac453662a', 'chk_c4de5bce8cecb425714cce0d2900e1d0', 'chk_71469579f0a9f6b9a1f278c364d51065', 'chk_52b63d77bf43b876cfb710b0def2fbcc', 'chk_95f7bb2661386983a957ba798caded32', 'chk_8649d08b16b9b12ae93322a1936015ea', 'chk_6437620adce7aa30ccd9805d5a8598da', 'chk_f46eb1ae078a33a4748c6fb4225160ef', 'chk_23e90ddb68f5ba2ef561796935ffe44a', 'chk_7adc2aa60ee65cb8df10902a783afb34', 'chk_7c91f9555d05e335d195d761340f8968', 'chk_f2b556a39427cccdd53674890e5b73f5', 'chk_e14518b71fb3306fef04fcf950cae886', 'chk_9cf525b383c7d980312f7f2ae0b20ba0', 'chk_97bf7b48a05f7d61d9dd51ea968057b9']
            await page1.waitForTimeout(2000)
            for (let i = 0; i < arrTrue.length; i++) {
                await page1.click(`input#${answers[i * 3 + arrTrue[i] - 1]}[type="radio"].deck`)
                await page1.waitForTimeout(200)
            }
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(8000)
        }


        const doFillDinline = async (answers) => {//dùng cho bài điền ,  đối số nhận vào là đáp án đúng
            await page1.waitForTimeout(6000)
            // Truyền answers và count vào hàm evaluate bằng tham số
            await page1.evaluate((answers) => {
                const inputs = document.querySelectorAll('input.danw.dinline');
                inputs.forEach((input, index) => {
                    // Sử dụng index để truy cập vào mảng answers

                    input.value = answers[index];
                });
            }, answers);
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(8000)
        }

        const doClickBtn = async (url) => { // dùng cho bài chỉ ấn nút hoàn thành , không đối số
            await page1.waitForTimeout(3000)
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(8000)
        }
        const doCheckBox3 = async (answers) => {
            const ids = await scrapling();
            for (let i = 0; i < answers.length; i++) {
                await page1.click(`input#${ids[i * 3 + answers[i] - 1]}[type="radio"].deck`);
                await page1.waitForTimeout(200);
            }
            page1.click("button.btn.btn-info.dnut");
            await page1.waitForTimeout(2000);
        }
        const doCheckBox4 = async () => { // bài này dùng cho checkbox , 1-A , 2:B , 3 -C , đối số nhận vào là đáp án đúng
            let answers = ['chk_879fb036880969b30cccd23864ffb047', 'chk_ecea75c8a732e60a4296df05fd2d21fd', 'chk_999c51a2380fe0c96d3ec9523a0907d8', 'chk_d86c0ce1065781501d510ec509fb1e90', 'chk_fe45897650bcf550c9defc4520ab3313', 'chk_ac18ecedc6a1a71b26568c53ae5c0e62', 'chk_d14d1ee490010de101c847bbe5b69e95', 'chk_009a8b5a0cdf9d29afdc7eda9c2e8729', 'chk_d7207860598dc597770e93d8b42b44dd', 'chk_fc721c1b9e22384e1bae7ad5557f5662', 'chk_d7207860598dc597770e93d8b42b44dd', 'chk_c855c78f36d540891bf6ecb301bb3f18', 'chk_9662e1566c6cd53c97d30a0cd48af0f8', 'chk_05f9be08a7893f00515b7c27aa125016', 'chk_9951145db4d446ec7ace1fd924468dac', 'chk_f6c133924af9a1fee113960ac453662a', 'chk_c4de5bce8cecb425714cce0d2900e1d0', 'chk_71469579f0a9f6b9a1f278c364d51065', 'chk_9951145db4d446ec7ace1fd924468dac', 'chk_9951145db4d446ec7ace1fd924468dac', 'chk_f6c133924af9a1fee113960ac453662a', 'chk_6437620adce7aa30ccd9805d5a8598da', 'chk_f46eb1ae078a33a4748c6fb4225160ef', 'chk_23e90ddb68f5ba2ef561796935ffe44a']
            await page1.waitForTimeout(2000)
            await page1.click(`input#${answers[1]}[type="radio"].deck`);
            await page1.click(`input#${answers[7]}[type="radio"].deck`);
            await page1.click(`input#${answers[10]}[type="radio"].deck`);
            await page1.click(`input#${answers[13]}[type="radio"].deck`);
            await page1.click(`input#${answers[18]}[type="radio"].deck`);
            await page1.click(`input#${answers[20]}[type="radio"].deck`);
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(8000)
        }
        const doClickHearing = async (arrTrue) => { // nhận vào một mảng số nguyên chứa đáp án đúng
            const elements = await page1.$$('.dtitle');
            await page1.waitForTimeout(2000)
            for (let i = 0; i < arrTrue.length; i++) {
                try {
                    await elements[arrTrue[i]].click()
                    await page1.waitForTimeout(2000)
                }
                catch (err) {

                }
            }
            await page1.waitForTimeout(6000)
        }
        const doSoundLabels = async () => {
            await page1.waitForTimeout(2000)
            const elements = await page1.$$('.dtitle');
            for (let i = 0; i < elements.length; i++) {
                try {
                    await page1.waitForTimeout(4000);
                    await elements[i].click()
                }
                catch (err) {
                    continue;
                }
            }
            await page1.waitForTimeout(6000)
        }
        const abcExercise = async () => {
            const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', '']
            let inputs = await page1.$$(`input.danw.dinline[type="text"]`)
            let length = inputs.length;
            await page1.waitForTimeout('2000')
            let i = 1;
            for (let input of inputs) {
                await page1.evaluate((input) => {
                    input.value = 'a'; // Set the value of the input element
                }, input);
            }
            await page1.click("button.btn.btn-info.dnut");
            while (i < length) {
                await page1.waitForTimeout(1000)
                for (let input of inputs) {
                    //pending 
                    let color = await page1.evaluate(input => {
                        return window.getComputedStyle(input).color;
                    }, input);
                    //fullfilled or rejected 

                    await page1.waitForTimeout(1000)
                    if (color !== 'rgb(0, 128, 0)') {
                        // hàm trong evaluate 
                        await page1.evaluate((input, letter) => {
                            input.value = letter; // Set the value of the input element
                        }, input, letters[i]);
                    }
                }
                i++;
                await page1.click("button.btn.btn-info.dnut");
            }

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
            await page1.waitForTimeout(2000)
            const inputs = await page1.$$('input.danw.dinline')
            for (let index = 0; index < inputs.length; index++) {
                await inputs[index].type("trâu cày eop")
                await page1.waitForTimeout(1000)
            }
            await page1.click("button.btn.btn-info.dnut")
            await page1.waitForTimeout(28000)
            await page1.click('button.btn.dnut.btn-danger')
            await page1.waitForTimeout(2000)
            for (let index = 0; index < inputs.length; index++) {
                const backgroundImage = await page1.evaluate(element => {
                    const computedStyle = window.getComputedStyle(element);
                    return computedStyle.getPropertyValue('background-image');
                }, inputs[index]);
                let base64 = backgroundImage.replace(`url("data:image/png;base64,`, "").replace(`")`, "")
                let answer = await getText(base64)
                console.log(answer);
                answers.push(answer)
            }

            for (let index = 0; index < answers.length; index++) {//vòng lặp custom
                answers[index] = answers[index].replace("\n", "")
                if (answers[index].includes("|")) {
                    answers[index] = answers[index].replaceAll("|", "I")
                }
                if (answers[index] == "Cc") {
                    answers[index] = "C"
                }

            }
            console.log(answers)
            await page1.click("button.btn.dnut.btn-primary")
            for (let i = 0; i < inputs.length; i++) {
                await inputs[i].type(answers[i])
                await page1.waitForTimeout(1000)
            }
            await page1.click("button.btn.btn-info.dnut") // click vào nút hoàn thành
            await page1.waitForTimeout(8000)

        }


        //UNIT 1

        // await walkThrough("Unit 1: Approaching to IT")



        // await page.waitForTimeout(500)
        // await doVocabularyButtons()
        // await page.waitForTimeout(500)
        //         await doVocabularyButtons()
        //         await page.waitForTimeout(500)
        //         await doVocabularyButtons()





        //         await doCheckBox([1, 2, 3, 2, 1, 3, 2, 1, 3, 2])
        //         await doCheckBox([1, 3, 2, 1, 3, 2, 1, 3, 1, 2])

        //         await doFillDinline(["C", "D", "F", "H", "A", "I", "E", "B", "J", "G"])
        //         await doFillDinline(["Set up", "Computer Networks", "System analyst", "Helpdesk technician", "Hardware engineer", "Image and graphic design", "Programming software", "System software", "Workstation", "Mainframe"])
        //         await doFillDinline(["Encode", "Decode", "Convert", "Transmit", "Perform", "Retrieve", "Server", "Network", "Tester", "Data transfer"])
        //         await doFillDinline(["storage device", "workstation", "convert", "software engineering", "computer security specialist", "retrieve"])
        //         await doFillDinline(['software developer', 'encode', 'data processing', 'security', 'server', 'output devices', 'system', 'masters', 'administrator', 'supervisors'])

        //         await doClickBtn()
        //         await doClickBtn()
        //         await doCheckBox([1, 2, 2, 3, 1])
        //         await doFillDinline(['who', 'who', 'that', 'which', 'whom', 'whose'])
        //         await doCheckBox([1, 3, 2, 1, 3])
        //         await doFillDinline(['e', 'f', 'h', 'i', 'b', 'a', 'j', 'd', 'c', 'g'])
        //         await doFillDinline(['My brother is an IT technician who installs desktop and laptop computers, and configures them to run on a company network.', 'Google LLC is an American multinational technology company, which specializes in Internet – related services and products.', 'An IT organization is the department within a company that is charged with establishing, monitoring and maintaining information technology systems and services', 'My colleagues whom I often share experiences with to improve myself are very professional', 'I have bought a workstation whose configuration is extremely superior.'])
        //         await doFillDinline(["A web manager is a person who is responsible for maintaining, designing or developing a website.", "A mobile application developer is in charge of creating software for mobile devices.", 'An IT help desk is a person whom I need to contact with when my computer breaks down', 'A technical support is a person who provides technical assistance and trains to customers over a wide range of issues and disciplines.', 'A tablet is a touch screen device that resembles a very large smartphone.', ' A server, which manages access to centralized resourse or service in a network, is installed special application software.'])
        //         await doFillDinline(["B", "that", "C", "that", "A", "which", "D", "who", "C", "identifying", "A", "whom", "B", "whose", "B", "for", "C", "creating", "B", "helping"])
        //         await doFillDinline(["software developer", "helpdesk supervisor", "project manager", "support technician", "database administrator", "system analyst"])
        //         await doFillDinline(['updating website regularly', 'computer support center', 'troubleshooting', 'a software engineer', 'access passwords'])
        //         await doFillDinline(['B', 'A', 'D', 'F', 'C', 'E', '', ''])
        //         await doFillDinline(['computer science', 'networking', 'course', 'health and medicine', 'human life', '', '', ''])
        //         await doFillDinline(['updating website regularly', 'computer support center', 'troubleshooting', 'a software engineer', 'access passwords', '', '', ''])
        //         await doFillDinline(['technology','3','practical','flexible','great money','','',''])
        //         await doFillDinline(['F','F','T','T','F','','',''])
        //         await doFillDinline(['T','F','F','T','T','','',''])





        //         await doCheckBox([1, 3, 2, 1,3]);
        //         await doCheckBox4();


        //     await doFillDinline(['IT managers','maintenance, installation, staffing','in-house development team','over five years','experience','','',''])
        //     await doFillDinline(['human brain','design and development', 'computing', 'interface problem','any major language','','','','',''])    
        //     await doFillDinline(['data','the internet', 'packets', 'Metropolitan Area Network','geographic area','','','','',''])
        //     await doFillDinline(['B','A', 'C','B','C','A','','','',''])

        //      a = 'Software Update is the easiest and quickest solution that checks and updates software on your computer.';
        //      b = 'Programming software is a software which helps the programmer in developing other software.';
        //      c = 'My iPhone was broken, and it took me an hour to retrieve all data from iCloud.';
        //      d = 'Storage device is the computer hardware which is used to store data.';
        //      e = 'A hardware engineer is responsible for developing computer systems and components.';
        //      f = 'A computer security specialist is in charge of protecting information assets.';
        //     await doFillDinline([a,b,c,d,e,f]);

        // a = 'Data processing which retrieves, transforms or classifies information is a series of operations on a data by computer.'

        // b = 'My boyfriend is a webmaster whose role is maintaining one or many websites.'

        // c = 'A helpdesk technician, who provides troubleshooting service to users, works in a support center.'

        // d = 'My brother is using a workstation that is designed for technical or scientific applications.'

        // e = 'Tom, whom I worked with in a computer company 5 years ago, is working as a system analyst in New York.'
        // await doFillDinline([a,b,c,d,e])

        // a = 'A project manager is in charge of planning, developing, and managing a project.'
        // b = 'A database administrator is responsible for using specialized software to store and organize data.'
        // c = 'A web developer is a person who codes and designs a website according to a company’s specifications.'
        // d = 'Information security is the set of processes that is designed to protect your data.'
        // e = 'Input devices are any hardware devices, which are used to provide data and control signals to a computer.'
        // f = 'My brother, whose job is testing all computer software or applications, is working in FPT company.'
        // await doFillDinline([a,b,c,d,e,f]);

        // await doCheckBox([1, 3, 2, 1, 2, 3]);
        // await doClickBtn();

        // await closePages();










        //UNIT 2

        // await walkThrough("Unit 2: Inside the computer")


        // await doVocabularyButtons();
        // await doClickBtn();
        // await doVocabularyButtons();
        // await doVocabularyButtons();
        // await doVocabularyButtons();


        //     await doSoundLabels();

        //     await doSoundLabels();
        //    await doSoundLabels();


        // await doFillDinline(['Motherboard','cache','processor','permanently','temporarily','instruction','bus','operate','execute','process','access','hold']);
        // await doFillDinline(['System fan','Power supply','Motherboard','Processor','RAM modules','Optical drive','Hard drive','Heat sink','Heat sink']);
        // await doFillDinline(['operate','contains','holds','process','perform','access','carry out','transfer']);
        // await doFillDinline(['contains','instructions','central processing unit','execute','Ram modules','holds','hard drives','mathematical calculations','registers','execute']);

        // await doClickBtn();
        // await doClickBtn();
        // await doClickBtn();
        // await doClickBtn();
        // await doClickBtn();
        // await doClickBtn();

        // await doFillDinline(['Containing','Processing','Accessing','Carrying','Executing','Transferring','Holding','Operating','Performing','Consisting']);
        // await doFillDinline(['to store','processing','to hold','controlling','displaying','to carry out','removing','to speed']);

        // await doCheckBox([3,2,1,3,2]);


        // a = 'My Dad is a software engineer who works very hard.';
        // b = 'Every computer contains a processor which is considered the brain of computer.';
        // c = 'The motherboard is inside computer case which is to hold many important computer hardware elements.';
        // d = 'I want to become a support technician like my brother who is my role model.';
        // e = 'CPU is an indispensable part of computer which consists of three main units including control units, ALU and registers.';
        // await doFillDinline([a,b,c,d,e]);

        // await doFillDinline(['that','that','who','that','that','who']);
        // await doFillDinline(['inside','from','to','into','between','along','from','to','onto','from','into']);
        // await doFillDinline(['C', 'which', 'B', 'into', 'C', 'inside', 'D', 'processing', 'B', 'Who', 'B', 'to hold', 'B', 'to reduce', 'B', 'who', 'D', 'into', 'A', 'does']);
        // await doFillDinline(['x','x','o','x','x','o','x','x','x','o'])
        // await doFillDinline(['t','f','t','f','f','t']);
        // await doFillDinline(['software','hardware','CPU','main memory','RAM','ROM','storage devices','mouse','monitor','hard disk']);
        // await doFillDinline(['computer hardware','a house','a hard drive','access','a processor']);
        // await doFillDinline(['processor','carry out','heat sink','clear','a hard drive','power supply unit']);
        // await doFillDinline(['all the processing','heat sink','under heat sink','two','carry out instruction']);

        // await doFillDinline(['e','h','d','a','g','f','b','c']);
        // await doCheckBox3([3,3,1,1,2]);
        // await doFillDinline(['f','f','t','f']);

        // await doFillDinline(['CPU','central processing unit','control unit','registers','main memory','system clock','synchronize','adding extra chips']);
        // await doFillDinline(['2','binary digit','byte','American Standard Code','kilobytes, gigabytes','megabytes, gigabytes']);
        // await doFillDinline(['processor','256 megabytes','hard drive','soundcard','48','monitor','19']);
        // await doFillDinline(['memory','it is erased','check motherboard manufacturer','a ruler','in memory module slots']);

        // await doCheckBox3([1,3,1,1,3]);

        // a = 'When I was young, I used to wish to become an engineer who loves working with technical things.';
        // b = 'When I was young, I used to wish to become an engineer that loves working with technical things.';
        // c = 'There are some people and horses outside that are doing a parade.';
        // e = 'My dad is a person who works and develops hardware parts of computer.';
        // f = 'My dad is a person that works and develops hardware parts of computer.';
        // g = 'Johnny had a dream last night which was to earn a lot of money from working as a hacker.';
        // h = 'Johnny had a dream last night that was to earn a lot of money from working as a hacker.';
        //  j = 'Pc system is basically divided into two main things which are hardware and software.';
        //  k = 'Pc system is basically divided into two main things that are hardware and software.';
        // await doFillDinline([a,b,c,e,f,g,h,j,k]);

        // a = 'Computer hardware comes in all shapes and sizes.'
        // b = 'There are a lot of important parts inside a computer case.'
        // c = 'Motherboard is for holding key components such as CPU and RAM.'
        // d = 'Data which is stored in hard drive can\'t be lost.';
        // e = 'If you turn off your computer, Ram will turn to be cleared.';
        // f = 'Electricity is provided for computer by power supply.';
        // await doFillDinline([a,b,c,d,e,f]);

        // a = 'A computer consists of two main parts that are hardware and software.';
        // b = 'My dad is a hardware engineer who is really good at repairing.';
        // c = 'The system clock is located on the motherboard.';
        // d = 'This processor operates at clock speed of 2 thousand million cycles per second.';
        // e = 'My computer hard drive capacity is approximately 8GB.';
        // f = 'This soundcard is compatible with various instruments input such as guitar.';
        // await doFillDinline([a,b,c,d,e,f]);

        // a = 'CPU is used to process information into data.';
        // b = 'Control unit is for controlling the timing signals in a computer.';
        // c = 'The function of ALU is to perform arithmetic calculations and logical operations.';
        // d = 'Registers help storing and controlling data.';
        // e = 'RAM works by storing data for short-term use.';
        // f = 'This is a device which stores data for long-term use.';
        // g = 'Bus is an electronic channel which is used for carrying information.';
        // await doFillDinline([a,b,c,d,e,f,g]);

        // await doClickBtn();
        // await closePages();





        // //UNIT 3
        // await walkThrough("Unit 3: Input and output devices");

        // await doVocabularyButtons();
        // // await doVocabularyButtons();

        // // // await doSoundLabels();

        // // await doFillDinline(['graphics tablet', 'game controller', 'scanner', 'mouse', 'keyboard', 'light pen', 'printer', 'microphone', 'projector', 'speakers', 'trackball', 'monitor']);
        // // await doFillDinline(['alphanumeric keys', 'right mouse button', 'function keys', 'scroll wheel', 'a numeric keypad', 'left mouse button', 'arrow keys', 'palm rest', 'a dedicated key', 'cable']);
        // // await doFillDinline(['barcode reader', 'camcorder', 'digital camera', 'game controller', 'graphics tablet', 'joystick', 'keyboard', 'light pen', 'microphone', 'mouse', 'scanner', 'touchpad', 'touch screen', 'webcam', 'monitor', 'printer', 'projector', 'speaker']);
        // // await doFillDinline(['f', 'a', 'b', 'g', 'e', 'd', 'c', 'i', 'j', 'h'])
        // // await doFillDinline(['Colour depth', 'mouse', 'resolution', 'printer', 'buttons', 'Function keys', 'scanner', 'LCD', 'VGA', 'digital camera'])
        // // await doFillDinline(['aspect ratio', 'Resolution', 'release', 'Double', 'clicking', 'Flat screen', 'Liquid Crystal Display', 'scroll wheels', 'Dragging', 'left mouse button', 'Alphanumeric keys'])

        // // await doClickBtn();
        // // await doClickBtn();
        // // await doClickBtn();
        // // await doClickBtn();
        // // await doClickBtn();

        // // await doFillDinline(['are more expensive', 'faster than', 'better images than', 'most impressive', 'less than', 'less', 'less', 'the most reliable', 'sharper and crisper', 'wider', 'the highest', 'the ultra-thinnest', 'longer and more comfortable'])
        // // await doFillDinline(['b', 'c', 'a', 'h', 'e', 'g', 'f', 'd'])
        // // await doFillDinline(['features', 'to confirm', 'removing', 'are', 'are', 'provides', 'allowing', 'allows', 'offers', 'works', 'Featuring', 'is used']);
        // // await doFillDinline(['however', 'Although', 'Besides', 'but', 'Since', 'Therefore', 'Because', 'since', 'Consequently', 'However'])

        // // await doCheckBox([1, 1, 2, 3, 1, 2, 3, 3, 1, 1])

        // // await doFillDinline(['provides', 'have', 'highest', 'weigh', 'Featuring', 'therefore', 'Because', 'removing', 'better', 'allowing'])
        // // await doFillDinline(['D', 'to video chat', 'C', 'perform', 'C', 'wider', 'B', 'of', 'B', 'because', 'A', 'Lower', 'A', 'How much', 'B', 'with', 'A', 'features', 'D', 'less'])
        // // await doFillDinline(['t', 'f', 't', 'f', 'f'])
        // // await doFillDinline(['specific functions', 'typewriter', 'Control', 'function keys', 'numeric keypad'])

        // // await doCheckBox([1, 2, 2, 2, 1])

        // // await doFillDinline(['Printer', 'HP', '2400', 'a paper jam', '\"Start\" button', 'No'])
        // // await doFillDinline(['face down', 'optical character recognition', 'three', 'flatbed scanner', 'about four inches'])
        // // await doFillDinline(['a touchpad', 'joystick', 'touchscreen', 'stylus', 'eye movement', 'Microphone'])

        // // await doCheckBox([2, 1, 3, 3, 1])

        // // await doFillDinline(['buttons or keys', 'a typewriter', 'navigation keys', 'particular software application', 'numeric keypads'])
        // // await doFillDinline(['a scanner', 'the image', 'light-sensitive silicon chip', 'a built-in camera', 'video editing software'])
        // // await doFillDinline(['LCD', 'pixel', '16:9', 'diagonally', '16.7 million'])
        // // await doFillDinline(['f', 'f', 't', 't', 'f', 't', 'f', 't']);
        // await doFillDinline(['laser printers', 'hard copy', 'resolution', 'electronic data', 'Print dialog box', 'Wi-Fi network'])

        // a = '“Shift” is used for capitalizing letters and entering different types of symbols.';
        // b = 'The dimension of this HP monitor is 6.7 inches long by 19.6 inches wide by 15.2 inches high.';
        // c = 'Laser printers typically have a resolution of 600 dots per inch or higher.';
        // d = 'This wireless mouse is not compatible with MacBook Pro or other laptops which only have C ports.';
        // e = 'Speakers are one of the most common output devices used with computer systems.';
        // await doFillDinline([a, b, c, d, e])

        // a = '“Control” is a Windows key which is used to enter keyboard shortcuts.';
        // b = 'The mouse cursor is most often an arrow which is used to point to different objects on the screen.';
        // c = 'Because caps lock changes the input of the letters, it is important to know whether it is on or off.';
        // d = 'Though Dot-matrix printers are cheaper, they are much slower than laser printers.';
        // e = 'This wireless gaming controller features pressure-sensitive buttons for precise gaming control.';
        // await doFillDinline([a, b, c, d, e])

        // await doFillDinline(['cheapest', 'low', 'noisy', 'cheap', 'more expensive', 'better', 'slow', 'expensive', 'best', 'faster', 'less', 'much'])

        // a = 'are used to move the cursor around the screen.';
        // b = 'offer longer and faster movements so most computer gamers prefer them.';
        // c = 'has a rubber base that prevents the pad from sliding around the table while making speedy movements.';
        // d = 'include basic scanning software enabling the user to configure, initiate, and import scans.';
        // e = 'typically support lower refresh rates than lower resolutions.';
        // await doFillDinline([a, b, c, d, e])

        // a = 'Because laser printers do not use ink, they have less image smearing problems than inkjet printers.';
        // b = 'Although Dot matrix printer does not have a very high resolution, it is an effective way of printing basic text documents.';
        // c = 'Dynamic microphones use a simple design; therefore, they are typically very durable and do not require electrical power.';
        // d = 'HDMI cables are often more expensive than analog cables since they cost more to manufacture.';
        // e = 'Personal laser printers cost less than ordinary laser printer; besides, they weigh less and require less space.';
        // await doFillDinline([a, b, c, d, e])

        // await doClickBtn();
        // await doClickBtn();
        // await closePages();






        //UNIT 4
        await walkThrough("Unit 4: Storage devices");

        await doVocabularyButtons();
        // await doVocabularyButtons();
        // await doVocabularyButtons();
        // await doVocabularyButtons();
        // await doVocabularyButtons();

        // await doSoundLabels(0);

        // await doFillDinline(['Volatility', 'Flash memory devices', 'Compact disk', 'Platter', 'Flash memory card', 'Disc burner', 'Laser beam', 'Head arm', 'Diskette', 'Spindle motor']);
        // await doFillDinline(['Spindle motor', 'Read/Write head', 'Platters', 'Power connector', 'Jumper pins', 'I/O connector', 'Actuator', 'Actuator axis', 'Head arm']);
        // await doFillDinline(['Hard drive', 'Magnetic tape', 'Hybrid hard drive', 'Diskette', 'CD', 'DVD', 'Blu-ray', 'Dual layer DVD', 'Flash memory card', 'USB', 'U3 smart drive', 'SSD'])
        // await doFillDinline(['j', 'h', 'g', 'f', 'e', 'd', 'c', 'b', 'a', 'i'])
        // await doFillDinline(['conform to standards', 'back up', 'have limited capacity', 'higher capacity', 'hold', 'move', 'hold', 'transfer', 'write data onto'])
        // await doFillDinline(['transfer data', 'store', 'floppy disk', 'back up', 'memory cards', 'compact disc', 'dual layer', 'platters', 'non-volatile', 'magnetic storage']);

        // await doClickBtn();
        // await doClickBtn();
        // await doClickBtn();
        // await doClickBtn();

        // await doFillDinline(['In addition to', 'As well as', 'besides', 'In addition', 'Moreover', 'Furthermore', 'And', 'Also', 'Not only/but also', 'In spite of', 'Despite', 'Although', 'Whereas', 'However', 'On the other hand', 'As a result', 'Consequently', 'Therefore', 'Thus', 'So']);
        // await doFillDinline(['Although', 'As a result', 'Consequently', 'Therefore', 'so', 'However', 'On the other hand', 'whereas', 'Besides', 'whereas'])
        // await doFillDinline(['performance', 'player', 'improvements', 'designers', 'challenge', 'considerably', 'combination', 'impressive', 'insufficient', 'competition', 'heavily'])
        // await doFillDinline(['How much memory does this hard drive have?', 'It has 1TB of data.', 'How many gigabytes can this SSD hold?', 'It can hold 240GB of data', 'What is the storage capacity of this memory card?', 'It can store 16GB of data.', 'How many megabytes can this CD store?', 'It can store 700MB of data.', 'How much memory does this DVD have?', 'It has 4.7GB of data', 'What is the storage capacity of these floppy drives?', 'They can hold 1.44MB of data'])
        // await doFillDinline(['backup', 'floppy disk drive', 'hard drive', 'tracks', 'access time', 'transfer rate', 'portable hard drive', 'limited capacity', 'transfer data', 'whereas'])


        // await doCheckBox3([2, 2, 1, 3, 3]);
        await doFillDinline(['B-backups', 'B-download', 'C-storage', 'C-storing', 'B-so', 'B-to', 'D-traditional', 'B-storage capacity', 'A-gigabytes', 'C-storage capacity', 'C-However', 'C-On the other hand']);
        await doCheckBox3([2, 2, 1, 3, 3]);
        await doFillDinline(['t', 'f', 't', 'f', 'f', 't', 'f'])

        await doFillDinline(['In 1996', '12 megabits per second', 'three', 'five', 'Yes, they can'])
        await doFillDinline(['optical storage', '200', 'diskette', 'network storage', 'SSDs', 'low power consumption']);
        await doFillDinline(['quick', 'volatile', 'expensive', '3.2 GHz', 'non-volatile'])
        await doFillDinline(['cameras', '1999', 'SDXC', '2TB', 'faster'])
        await doFillDinline(['very quickly', 'In a chip', 'solid-state technology', 'flash memory cards', 'hybrid hard drives'])
        await doFillDinline(['Very cheap', 'limited capacity', 'high capacities', 'removable', 'Slower', 'large capacities', 'random access'])
        await doFillDinline(['hard drives', '1.44MB', 'hundreds of gigabytes', 'capacity', 'go through'])
        await doFillDinline(['f', 't', 't', 'f', 'f'])

        await doCheckBox3([1, 3, 3, 3, 1])
        await doFillDinline(['coding techniques', 'faster', 'hard drives', 'damaged', 'magnetized'])
        await doFillDinline(['To make copies of your important files, you can use the Copy and Paste commands to transfer files to another storage device.', 'There are three main types of storage devices: magnetic, optical and flash memory storage devices', 'My father gave me a USB flash drive on my 18 th birthday. It can hold 8GB of data.', 'I often buy music CDs of my favourite band from a music shop near my house.', 'I really want to have a printer for printing documents at home but I cannot afford it.']);
        await doFillDinline(['CD, DVD and Blu-ray are examples of optical storage devices.', 'Floppy disks are slower to access and have less storage capacity than hard disks, but they are much less expensive.', 'Magnetic tape is a type of plastic tape which is used for recording sound, pictures as well as computer information.', 'There are two popular types of magnetic disks such as hard disks and floppy disks.', 'Despite having similarities in size and shape, CDs and DVDs data structure is very different.'])
        await doFillDinline(['Originally', 'computing', 'typically', 'varieties', 'protection', 'enclosures', 'removable', 'writable', 'rewritable', 'digital'])
        await doFillDinline(['The salesperson gave me a special offer, so I bought the new hard drive.', 'Magnetic disks are the most commonly used mass storage devices because they have low cost and high speed', 'I love using laptops for work, on the other hand my husband prefers desktop computers.', 'My husband prefers desktop computers, on the other hand I love using laptops for work.', 'Despite having internet connections, I cannot log in my gmail account.', 'I not only store data in a USB but also back up them onto my solid state drives.', 'I not only back up data onto my solid state drives but also store them in a USB.'])
        await doFillDinline(['Although CDs and DVDs are similar in size and shape, their data structure is very different.', 'In spite of getting Wi-fi connections, I cannot download your attachments on Google Drives.', 'Although they are only five, they\'re good at using the computer.', 'Your computer hard drive is almost full, so it is very slow.', 'Despite being convenient and easy to transfer data from one place to another, a USB has limited capacity.'])

        await doClickBtn();
        await closePages();





        // //UNIT 5
        // await walkThrough("Unit 5: System software");
        // await testingByUrl('https://eop.edu.vn/study/task/19141?id=dgJEtIB3yLyb3XP1KX1CSIaQ%3D%3D');
        // await doFillAll();







    } catch (error) {
        console.log(error);
    }


}
main()