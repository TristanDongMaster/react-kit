
export default function(callbackUrl){
    if(location.hostname=='localhost') return
    let url = '/login?ReturnUrl='
    if(callbackUrl){
        url += encodeURIComponent(callbackUrl)
    }else{
        url += encodeURIComponent(location.href)
    }
    location.replace(url)
}