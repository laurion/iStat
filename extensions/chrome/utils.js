function getDomain(url, type){
    if (!url)
        return;
    var domain =  url.split("/");
    if (!domain[2])
        return url;
    if (type=="shortDomain") {
        return domain[2];
    } else if (type=="noWwwDomain") {
        if (domain[2].indexOf("www.")==0)
            return domain[2].slice(4, domain[2].length);
        else
            return domain[2];
    } else if (type=="noSubOrWwwDomain") {
        domain = domain[2].replace(new RegExp(/^www\./i),"");
        if (domain.match(new RegExp(/\.[a-z]{2,3}\.[a-z]{2}$/i))) { // .??.?? or .???.?? (ex: .co.uk or .com.au)
            domain = domain.split(".");
            if (domain.length==5)
               domain = domain[2] + "." + domain[3] + "." + domain[4];
            else if (domain.length==4)
               domain = domain[1] + "." + domain[2] + "." + domain[3];
            else
               domain = domain[0] + "." + domain[1] + "." + domain[2];
        } else {
            domain = domain.split(".");
            if (domain.length==4)
                domain = domain[2] + "." + domain[3];
            else if (domain.length==3)
               domain = domain[1] + "." + domain[2];
            else if (domain[1])
               domain = domain[0] + "." + domain[1];
            else
               domain = domain[0];
        }
        return domain;
    } else {
        return domain[0] + "//" + domain[2] + "/";
    }
}