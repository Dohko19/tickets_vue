let user = document.head.querySelector('meta[name="user"]');

module.exports = {
    computed: {
        currentUser(){
            if (this.isAuthenticated)
            {
                return JSON.parse(user.content);
            }
            return {
                name: "Usuario Invitado"
            }
        },
        isAuthenticated(){
            return !! user.content;
        },
        guest(){
            return !this.isAuthenticated();
        }
    },
}
