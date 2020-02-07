const $siteList = $('.siteList')
//console.log($siteList)
const $last = $siteList.find("li.last")
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hasMap = xObject || [
    {logo:'A',  url:'https://www.acfun.cn'},
    {logo:'B',  url:'https://bilibili.com'},
]
const simplifyUrl =(url)=>{
    return url.replace('https://', '')
    .replace('http://','')
    .replace('www.','') 
    .replace(/\/.*/,'') //删除 / 开头的内容
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hasMap.forEach((node,index)=>{
        //console.log(index)  //打印出站点的下标
        const $li = $(
        `<li>
        
        <div class="site">
        <div class="logo">${simplifyUrl(node.logo[0])}</div>
        <div class="link">${simplifyUrl(node.url)}</div>
        <div class="close">
        <svg class="icon" >
            <use xlink:href="#icon-close"></use>
        </svg>
        </div>
        </div>
    
        </li>`
).insertBefore($last)
    $li.on('click',()=>{
    window.open(node.url)
})
    $li.on('click','.close',(e)=>{
    e.stopPropagation()  //阻止冒泡
    hasMap.splice(index,1)
    render()
})
})
}
render()
$('.addButton')
.on('click', ()=>{
 let url = window.prompt('请输入网址')

 if(url.indexOf('http')!==0){
   url = 'https://' + url
 }
 console.log(url)
 hasMap.push({
     logo:simplifyUrl(url)[0].toUpperCase(), 
     url:url
 })
 
 render()
})
window.onbeforeunload = ()=>{
    console.log('1111')
    const string = JSON.stringify(hasMap)   //可以把一个对象变成字符串
    localStorage.setItem('x',string)   //在本地的存储里面设置一个X，里面存string
}
//键盘监听
$(document).on('keypress',(e) =>{
    const {key} = e    //key = e.key
    for (let i = 0; i <hasMap.length;i++){
        if(hasMap[i].logo.toLowerCase() === key){   //toLowerCase  把大写变小写
            window.open(hasMap[i].url)
        }
    }
})
