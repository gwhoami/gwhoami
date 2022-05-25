function myLocalStorage () {
    this.login = 'GWHOAMI_LOGIN';
}
myLocalStorage.prototype.setLoginInfo = function(data) {
    localStorage.setItem(this.login, JSON.stringify(data));
}
myLocalStorage.prototype.getLoginInfo = function() {  return JSON.parse(localStorage.getItem(this.login)||''); }
myLocalStorage.prototype.empty = function() {  localStorage.clear(); }
myLocalStorage.prototype.getShortName = function() {  
    if (this.getLoginInfo().accessType) return "AD";
    else {
        let names = this.getLoginInfo().name.split(' ');
        return names.length === 1 ? `${names[0].charAt(0)}${names[0].charAt(1)||''}` : `${names[0].charAt(0)}${names[1].charAt(0)}`;
    }
}

const MyLocalStorage = new myLocalStorage();
export default MyLocalStorage;