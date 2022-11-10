//--- DOM Elements ---

const
    displayCurrentDate = document.querySelector('.current-date'),
    displayCurrentTime = document.querySelector('.current-time'),
    displayCurrentHours = document.querySelector('.current-time_hours'),
    displayCurrentMinutes = document.querySelector('.current-time_minutes'),
    displayCurrentSeconds = document.querySelector('.current-time_seconds'),
    dateInput = document.querySelector('#birthday'),
    sectionBirthdayDisplay = document.querySelector('.section_birthday-display'),
    sectionBirthdaySelect = document.querySelector('.section_birthday-select'),
    sectionBirthdaySelectedText = document.querySelector('.section_birthday-display figcaption'),
    sectionBirthdayText = document.querySelector('.section_birthday-select_text'),
    formatList = document.querySelector('.section_birthday-display_dropdown ul'),
    formatListElements = document.querySelectorAll('.section_birthday-display_dropdown li')

// console.log('the format list elements', formatListElements)



//--- DATE Elements---

const
    currentDate = new Date(),
    thisDay = currentDate.getDay(),
    thisTime = currentDate.toTimeString().slice(0,8),
    thisTimeInMilliseconds = currentDate.getTime()

let 
    initialSeconds = currentDate.getSeconds(),
    initialMinutes = currentDate.getMinutes(),
    initialHours = currentDate.getHours()

let
    seconds,
    minutes,
    hours,
    days,
    month,
    years

// console.log('current time in milliseconds', thisTimeInMilliseconds)
// console.log('seconds',seconds)
// console.log('minutes', minutes)
// console.log('hours', hours)

let 
    YMDHMSArray = [],
    userBirhdayInYears,
    userBirthdayInMonth,
    userBirthdayInDays,
    userBirthdayInHours,
    userBirthdayInMinutes,
    userBirthdayInSeconds,
    daysPerMonthAverage,
    daysPerYearAverage



//--- functions ---

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }

const getYMDHMSFullParts = (milliseconds, leapYears, normalYears)=>{
    let 
        yearDifference = leapYears + normalYears

    daysPerMonthAverage = ((leapYears * 366) + (normalYears * 365)) / yearDifference / 12
    daysPerYearAverage = (leapYears * 366 + normalYears * 365 ) / yearDifference
        
    daysPerMonthAverage = daysPerMonthAverage || 30.4
    daysPerYearAverage = daysPerYearAverage || 365

    // console.log('days per month average', daysPerMonthAverage)
    // console.log('days per year average', daysPerYearAverage)
    // console.log('')


    seconds = milliseconds / 1000,
    minutes = seconds / 60,
    hours = minutes / 60,
    days = hours / 24,
    month = days / daysPerMonthAverage,
    years = month / 12

    // console.log('days sum', days)
    // console.log('years', years)
    }

const getYMDHMS = (milliseconds, leapYears, normalYears, userBirthdayYear)=>{
    
    getYMDHMSFullParts(milliseconds, leapYears, normalYears)

    seconds = Math.floor(seconds % 60)
    minutes = Math.floor(minutes % 60)
    hours = Math.floor(hours % 24)
    days = Math.floor(days % daysPerMonthAverage)
    month = Math.floor(month % 12)
    years = Math.floor(years)

    userBirthdayYear % 4 === 0 && days++

    console.log('seconds', seconds)
    console.log('minutes', minutes)
    console.log('hours', hours)
    console.log('days', days)
    console.log('month', month)
    console.log('years', years)

    return [seconds, minutes, hours, days,month, years]
}

const getUserBirthdayYears = (milliseconds, leapYears, normalYears)=>{
    getYMDHMSFullParts(milliseconds, leapYears, normalYears)

    console.log('user birthday years =>', years)
    return years
}

const getUserBirthdayMonth = (milliseconds, leapYears, normalYears)=>{
    getYMDHMSFullParts(milliseconds, leapYears, normalYears)

    console.log('user birthday month =>', month)
    return month
}

const getUserBirthdayDays = (milliseconds, leapYears, normalYears)=>{
    getYMDHMSFullParts(milliseconds, leapYears, normalYears)

    console.log('user birthday days =>', days)
    return days
}

const getUserBirthdayHours = (milliseconds, leapYears, normalYears)=>{
    getYMDHMSFullParts(milliseconds, leapYears, normalYears)

    console.log('user birthday hours =>', hours)
    return hours
}

const getUserBirthdayMinutes = (milliseconds, leapYears, normalYears)=>{
    getYMDHMSFullParts(milliseconds, leapYears, normalYears)

    console.log('user birthday minutes =>', minutes)
    return minutes
}

const getUserBirthdaySeconds = (milliseconds, leapYears, normalYears)=>{
    getYMDHMSFullParts(milliseconds, leapYears, normalYears)

    console.log('user birthday seconds =>', seconds)
    return seconds
}



//--- Set the Displays ---

// console.log('the current date \n', currentDate)
// displayCurrentDate.innerHTML = currentDate.toDateString()

const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
displayCurrentDate.innerHTML = currentDate.toLocaleDateString('de-DE', options)

setInterval(()=>{
    initialSeconds++

    if(initialSeconds === 60){
       initialMinutes++
        initialSeconds = 0
    }

    if(initialMinutes === 60){
       initialHours++
       initialMinutes = 0
    }

    if(initialHours === 24){
        initialHours = 0
    }

    displayCurrentHours.innerHTML = padTo2Digits(initialHours) + ' : '
    displayCurrentMinutes.innerHTML = padTo2Digits(initialMinutes) + ' : '
    displayCurrentSeconds.innerHTML = padTo2Digits(initialSeconds)
},1000)



//--- events ---

document.addEventListener('submit', (event)=>{
    event.preventDefault()
    // console.log('fire');
    // console.log(dateInput.value)
    
    if(dateInput.value){
        let
            thisTimeInMilliseconds = new Date().getTime(),
            thisYear = new Date().getFullYear(),
            userBirthday = new Date(dateInput.value),
            userBirthdayMilliseconds = userBirthday.getTime(),
            userBirthdayYear = userBirthday.getFullYear(),
        
            timeDifference = thisTimeInMilliseconds - userBirthdayMilliseconds

        // console.log('this year', thisYear)
        // console.log('user birthday year', userBirthdayYear)
        // console.log('the difference in milliseconds', timeDifference)
        // console.log('user birthday', userBirthday)

        let 
            leapYears = 0, 
            normalYears = 0
        
        for(let userBirthdayYearX = userBirthdayYear;userBirthdayYearX < thisYear; userBirthdayYearX++){
            if(userBirthdayYearX % 4 !== 0){
                // console.log('no leap year', userBirthdayYear )
                normalYears++
                
            }
            else{
                // console.log('leap year', userBirthdayYear)
                leapYears++
            }
        }

        // console.log('leap years count', leapYears)
        // console.log('normal years count', normalYears)

        let userTimeData = {
            timeDifference: timeDifference,
            leapYears: leapYears,
            normalYears: normalYears,
            userBirthdayYear : userBirthdayYear
        }

        // console.log('the current time dates =>', userTimeData)
        localStorage.setItem('userTime', JSON.stringify(userTimeData))

        let 
            randomNumber = Math.floor(Math.random() * (formatListElements.length)),
            randomFormat = formatListElements[randomNumber].innerHTML

        console.log('random number =>', randomNumber)
        // console.log('random format', randomFormat)

        randomFormat === 'JMTSMS' &&  
            (YMDHMSArray = getYMDHMS(timeDifference, leapYears, normalYears, userBirthdayYear))

        randomFormat === 'Jahre' && 
            (userBirhdayInYears = 
            getUserBirthdayYears(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2))

        randomFormat === 'Monate' && 
            (userBirthdayInMonth = 
            getUserBirthdayMonth(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2))

        randomFormat === 'Tage' && 
            (userBirthdayInDays = 
            getUserBirthdayDays(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2))

        randomFormat === 'Stunden' && 
            (userBirthdayInHours = 
            getUserBirthdayHours(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2))

        randomFormat === 'Minuten' && 
            (userBirthdayInMinutes = 
            getUserBirthdayMinutes(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2))

        randomFormat === 'Sekunden' && 
            (userBirthdayInSeconds = 
            getUserBirthdaySeconds(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2))
       
        // console.log(YMDHMSArray)
        // console.log('user birthday in years', userBirhdayInYears)
        // console.log('user birthday in month', userBirthdayInMonth)
        // console.log('user birthday in days', userBirthdayInDays)
        // console.log('user birthday in hours', userBirthdayInHours)
        // console.log('user birthday in minutes', userBirthdayInMinutes)
        // console.log('user birthday in seconds', userBirthdayInSeconds)

        sectionBirthdaySelect.classList.add("bye-bye")
        sectionBirthdayDisplay.classList.add('good-morning')

        // randomNumber = 5
        switch (randomNumber){
            case 0:
                sectionBirthdayText.innerHTML = 
                    `<span>Du bist momentan<span> 
                    <span>${YMDHMSArray[5]} Jahre,<span> 
                    <span>${YMDHMSArray[4]} Monate,<span>
                    <span>${YMDHMSArray[3]} Tage,<span>
                    <span>${YMDHMSArray[2]} Stunden,<span>
                    <span>${YMDHMSArray[1]} Minuten,<span>
                    <span>und  ${YMDHMSArray[1]} Sekunden alt.<span>`

                sectionBirthdaySelectedText.innerHTML = 'JMTSMS'
                break
            
            case 1:
                let formatedYears = new Intl.NumberFormat('de-DE').format(parseFloat(userBirhdayInYears))

                sectionBirthdayText.innerHTML = 
                    `<span>Du bist momentan</span>
                    <span>${formatedYears} Jahre alt.<span> 
                    `
                sectionBirthdaySelectedText.innerHTML = 'Jahre'
                break

            case 2:
                let formatedMonth = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInMonth))

                sectionBirthdayText.innerHTML = 
                    `<span>Du bist momentan</span>
                    <span>${formatedMonth} Monate alt.<span> 
                    `
                sectionBirthdaySelectedText.innerHTML = 'Monate'
                break

            case 3:
                let formatedDays = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInDays))

                sectionBirthdayText.innerHTML = 
                    `<span>Du bist momentan</span>
                    <span>${formatedDays} Tage alt.<span> 
                    `
                sectionBirthdaySelectedText.innerHTML = 'Tage'
                break

            case 4:
                let formatedHours = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInHours))

                sectionBirthdayText.innerHTML = 
                    `<span>Du bist momentan</span>
                    <span>${formatedHours} Stunden alt.<span> 
                    `
                sectionBirthdaySelectedText.innerHTML = 'Stunden'
                break

            case 5:
                let formatedMinutes = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInMinutes))
                // console.log(formatedMinutes)

                sectionBirthdayText.innerHTML = 
                    `<span>Du bist momentan</span>
                    <span>${formatedMinutes} Minuten alt.<span> 
                    `
                sectionBirthdaySelectedText.innerHTML = 'Minuten'
                break

            case 6:
                let formatedSeconds = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInSeconds))

                sectionBirthdayText.innerHTML = 
                    `<span>Du bist momentan</span>
                    <span>${formatedSeconds} Sekunden alt.<span> 
                    `
                sectionBirthdaySelectedText.innerHTML = 'Sekunden'
                break

        }

        let currentTimeFormat = sectionBirthdaySelectedText.innerHTML

        formatListElements.forEach(listItem =>{
            listItem.innerHTML === currentTimeFormat && (listItem.style.display = 'none')
        })
    }
    else{
        alert('Du musst dein Geburtsdatum eingeben')
    }
  
})

document.addEventListener('DOMContentLoaded', ()=>{
    dateInput.setAttribute('max', currentDate.toISOString().slice(0,16))
})



// event handler drop-down list
const listIn = ()=>{
    formatList.classList.toggle('list-in')

}

formatList.addEventListener('click', (event)=>{
    let 
        theSelectedElementContent = event.target.innerHTML,
        userTimeFromStorage = JSON.parse(localStorage.getItem('userTime')),
        {timeDifference, leapYears, normalYears, userBirthdayYear} = userTimeFromStorage
      

    // console.log(userTimeFromStorage)
    // console.log('data timeDifference =>', timeDifference)
    // console.log('data leapYears =>', leapYears)
    // console.log('data normalYears =>', normalYears)
    // console.log('data userBirhdayYear =>', userBirthdayYear)

    switch (theSelectedElementContent){
        case 'Jahre':
            sectionBirthdaySelectedText.innerHTML = 'Jahre'
        
            userBirhdayInYears = 
            getUserBirthdayYears(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2)

            let formatedYears = new Intl.NumberFormat('de-DE').format(parseFloat(userBirhdayInYears))

            sectionBirthdayText.innerHTML = 
                `<span>Du bist momentan</span>
                <span>${formatedYears} Jahre alt.<span>`
            break

        case 'Monate':
            sectionBirthdaySelectedText.innerHTML = 'Monate'
        
            userBirthdayInMonth = 
            getUserBirthdayMonth(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2)

            let formatedMonth= new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInMonth))

            sectionBirthdayText.innerHTML = 
                `<span>Du bist momentan</span>
                <span>${formatedMonth} Monate alt.<span>`
            break

        case 'Tage':
            sectionBirthdaySelectedText.innerHTML = 'Tage'
        
            userBirthdayInDays = 
            getUserBirthdayDays(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2)

            let formatedDays = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInDays))

            sectionBirthdayText.innerHTML = 
                `<span>Du bist momentan</span>
                <span>${formatedDays} Tage alt.<span>`
            break

        case 'Stunden':
            sectionBirthdaySelectedText.innerHTML = 'Tage'
        
            userBirthdayInHours = 
            getUserBirthdayHours(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2)

            let formatedHours = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInHours))

            sectionBirthdayText.innerHTML = 
                `<span>Du bist momentan</span>
                <span>${formatedHours} Stunden alt.<span>`
            break

        case 'Minuten':
            sectionBirthdaySelectedText.innerHTML = 'Minuten'
        
            userBirthdayInMinutes = 
            getUserBirthdayMinutes(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2)

            let formatedMinutes = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInMinutes))

            sectionBirthdayText.innerHTML = 
                `<span>Du bist momentan</span>
                <span>${formatedMinutes} Minuten alt.<span>`
            break

        case 'Sekunden':
            sectionBirthdaySelectedText.innerHTML = 'Sekunden'
        
            userBirthdayInSeconds = 
            getUserBirthdaySeconds(timeDifference, leapYears, normalYears, userBirthdayYear).toFixed(2)

            let formatedSeconds = new Intl.NumberFormat('de-DE').format(parseFloat(userBirthdayInSeconds))

            sectionBirthdayText.innerHTML = 
                `<span>Du bist momentan</span>
                <span>${formatedSeconds} Sekunden alt.<span>`
            break

        case 'JMTSMS':
            sectionBirthdaySelectedText.innerHTML = 'JMTSMS'
        
            YMDHMSArray = getYMDHMS(timeDifference, leapYears, normalYears, userBirthdayYear)

            sectionBirthdayText.innerHTML = 
                    `<span>Du bist momentan<span> 
                    <span>${YMDHMSArray[5]} Jahre,<span> 
                    <span>${YMDHMSArray[4]} Monate,<span>
                    <span>${YMDHMSArray[3]} Tage,<span>
                    <span>${YMDHMSArray[2]} Stunden,<span>
                    <span>${YMDHMSArray[1]} Minuten,<span>
                    <span>und  ${YMDHMSArray[1]} Sekunden alt.<span>`
            break
    }

    currentTimeFormat = sectionBirthdaySelectedText.innerHTML
    
    formatListElements.forEach(listItem =>{

        setTimeout(()=>{
            listItem.innerHTML === currentTimeFormat && (listItem.style.display = 'none')
            listItem.innerHTML === currentTimeFormat || (listItem.style.display = 'block')
        }, 1200)
       
    })

})