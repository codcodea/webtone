interface ModernNavigator extends Navigator {
    userAgentData?: {
        brands: { brand: string }[]
        mobile: boolean
    }
}

// Check if the user is using a mobile device
const isMobile = () => {
    const nav = navigator as ModernNavigator
    let isMobile = false
    let userAgentMobile = null

    if (navigator.userAgent) {
        userAgentMobile =
            navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)
    }

    if (nav?.userAgentData) {
        isMobile = nav.userAgentData?.mobile as boolean
        return isMobile
    } else if (userAgentMobile) {
        isMobile = true
        return isMobile
    }
    return isMobile // false
}

// Check if the user is using a supported browser
function testBrowerCompability() {
    const nav = navigator as ModernNavigator

    if (nav) {
        if (nav.userAgentData?.mobile) return false
    }

    if (nav) {
        const approved = ['Google Chrome', 'Microsoft Edge']

        const userAgentData = nav.userAgentData?.brands.map((item) => item.brand)
        if (userAgentData) {
            return userAgentData.some((item) => approved.includes(item))
        }
    }

    if (navigator.userAgent) {
        const userAgentData = navigator.userAgent.match(/Chrome/i) || navigator.userAgent.match(/Edge/i)
        return !!userAgentData
    }
    return false
}

function isSafariDesktop(){
    if (navigator.userAgent) {
        return navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')
    }
    return false

}

const preferDark = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export { isMobile, testBrowerCompability, isSafariDesktop, preferDark}
