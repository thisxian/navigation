
const xian = {
    copy,
    toase,
    debounce,
    throttle,
    dom: {
        bgfadein,
        enterOrQuit,
        getDomBottomToViewBottom,
    }
}
export default xian



// 复制
function copy(content = '请输入复制的内容', res?: Function, rej?: Function) {
    const input = document.createElement("input");
    input.setAttribute("value", content);
    document.body.appendChild(input);
    // 复制内容
    input.select();
    // 将内容复制到剪贴板
    let flag = document.execCommand('copy') ? true : false
    const fun = [rej, res][+flag];
    fun?.()
    document.body.removeChild(input);
}

// 土司
function toase(option: any = {}) {
    if (typeof (option) === 'string') {
        option = { tips: option }
    }
    option.tips ??= '请输入提示'
    option.top ??= '100px'

    const css = `
        min-width: 150px;
        opacity: 0.7;
        height: 30px;
        color: rgb(255, 255, 255);
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        position: fixed;
        top: ${option.top};
        left: 50%;
        transform:translate(-50%);
        transition:2s;
        z-index: 999999;
        background: rgb(0, 0, 0);
        font-size: 14px;
    `
    const $toase = document.createElement('div');
    $toase.innerHTML = option.tips;
    $toase.style.cssText = css;
    document.body.appendChild($toase);
    setTimeout(() => {
        $toase.style.opacity = `0`
    }, 1000);

    setTimeout(function () {
        document.body.removeChild($toase)
    }, 3000);
}

// 防抖
function debounce(func: Function, time = 100) {
    let timer = setTimeout(() => { })
    return (...arr: any) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            func(...arr)
        }, time)
    }
}

// 节流
function throttle(func: Function, time = 1000) {
    let startTime = Date.now()
    return () => {
        if (Date.now() - startTime > time) {
            func()
            startTime = Date.now()
        }
    }
}


// 结点相关

/** 背景淡入
 * dom: 背景图片结点
 * src: 图片链接
 * transition: 淡入样式
 */
function bgfadein(dom: HTMLElement | string, src: string, transitom = '1s') {
    if (typeof dom === 'string') dom = document.querySelector(dom) as HTMLElement
    dom.style.opacity = '0'
    dom.style.transition = transitom
    const $img = new Image()
    $img.src = src
    $img.onload = () => {
        dom = dom as HTMLElement
        dom.style.backgroundImage = `url("${$img.src}")`;
        dom.style.opacity = '1'
    }
}

/** 监听dom元素进入消失视角
 * dom: 背景图片结点
 * src: 图片链接
 * transition: 淡入样式
 */
function enterOrQuit(dom: Element | string | Element[] | any, callback: Function) {
    if (typeof dom === 'string') dom = document.querySelector(dom) as Element
    if (dom instanceof NodeList) dom = Array.from(dom)
    if (!Array.isArray(dom)) dom = [dom];

    const ovserver = new IntersectionObserver((mutations) => {
        const status = mutations[0].isIntersecting;

        mutations.forEach(_ => {
            callback(status, _.target)
        })

    });
    dom.forEach((_: any) => {
        ovserver.observe(_)
    })
}



/** 获取dom元素底部距离视角顶部距离
 * dom: 目标dom结点
 */
function getDomBottomToViewBottom(dom: any) {
    // 视角高度
    const viewportHeight = document.documentElement.clientHeight;
    // 元素底部距离顶部的距离
    const elementBottom = dom.getBoundingClientRect().bottom;
    return viewportHeight - elementBottom
}
