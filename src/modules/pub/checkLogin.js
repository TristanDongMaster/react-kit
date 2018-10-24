import Cookies from 'js-cookie'
import redirect from './redirect'

export default function () {
    if (!Cookies.get('22222.com')) { 
        redirect()
    }
}