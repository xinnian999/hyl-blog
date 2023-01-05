const httpTohttps=(url:string)=>{
   if(/https/.test(url)) return url

 return  url.replace(/http/g,'https')
}

export default httpTohttps