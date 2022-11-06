
import Swal from 'sweetalert2';

export const tokenFunction = (user) => {

    const currentUser = {
        email: user?.email
    }

    fetch('https://product-crud-pagination-jwt-server.vercel.app/jwt', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(currentUser)
    })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            console.log("Token ", data.token)

            //set the jwt token in the local storage
            localStorage.setItem('product-token', data.token)

            Swal.fire(
                'Good job!',
                'Login Successful After getting the JWT Token from JWT Token Function',
                'success'
            )
        })

        .catch(error => {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops... Login Failed',
                text: 'Something went wrong!',
                })
        })

}



