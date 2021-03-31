const form = document.getElementById('reset-pwd');
const pwd = document.getElementById('password');
const rePwd = document.getElementById('re-password');
form.addEventListener('submit', e => {
    e.preventDefault();
    
    if(pwd.value != rePwd.value)
        alert('Re-entered new password is not matching.')
    else if(pwd.value.length < 6)
        alert('Password must be at least 6 characters.')
    else
        form.submit()
})