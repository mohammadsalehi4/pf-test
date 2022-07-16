import axios from 'axios'
import React,{useEffect,useState} from 'react'

const Address="https://pasbacktest.iran.liara.run"


const Home = (props) => {
    const [isLogin,setIsLogin]=useState(false)
    const [isAuth,setisAuth]=useState(false)
    const [username,SetUsername]=useState('')
    const [firstToken,SetFirstToken]=useState('')


    function setCookie(cname, cvalue, exhours) {
        var d = new Date();
        d.setTime(d.getTime() + (exhours*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) === 0) {
            return(c.substring(name.length, c.length));
          }
        }
        return ''
    }

    const firstLogin=()=>{
        const getusername=document.getElementById('getusername').value
        const getpassword=document.getElementById('getpassword').value

        axios.post(Address+'/login',{
            username:getusername,
            password:getpassword
        })
        .then(resp=>{
            if(resp.data.success){
                SetFirstToken(resp.data.token)
                setisAuth(true)
            }
        })
    }

    const fullLogin=()=>{
        axios.post(Address+'/confirm',{
            firstToken:firstToken,
            code:document.getElementById('getcode').value
        })
        .then(response=>{
            console.log(response)
            if(response.data.success){
                setIsLogin(true)
                setCookie('test-token',response.data.token,1)
                SetUsername(response.data.username)
                setCookie('test-username',response.data.username,1)

            }
        })
    }


    useEffect(()=>{
        if(props.isLogin===true){
            const MYusername=props.match.params.username
            const MYcode=props.match.params.code
            axios.post(Address+'/checkcode',{
                code:MYcode,
                username:MYusername
            })
            .then(response=>{
                if(response.data.success===true){
                    setIsLogin(true)
                    setCookie('test-token',response.data.token,1)
                    SetUsername(response.data.username)
                    setCookie('test-username',response.data.username,1)
                    window.location.assign('/')
                }
            })
        }
        const getToken=getCookie('test-token')
        const getUsername=getCookie('test-username')
        if(getToken){
            setIsLogin(true)
            SetUsername(getUsername)
        }
    },[])

    const logout=()=>{
        setIsLogin(false)
        setisAuth(false)
        SetUsername('')
        SetFirstToken('')
        const token=getCookie('test-token')
        setCookie('test-token',token,0)
        window.location.reload()
    }

    const AddSite=()=>{
        axios.post(Address+'/pascode',{},
        {headers:{authorization:firstToken}})
        .then(resp=>{
            if(resp.data.success){
                alert(resp.data.code)
            }
        })
    }

    const AutoLogin=()=>{
        console.log("http://passecurity.ir/autologin/pastest.iran.liara.run/")
        window.open("http://passecurity.ir/autologin/pastest.iran.liara.run/");
    }

    return (
        <div id='mainDiv'>
            {!isLogin ? 
                (!isAuth ?
                    <div className='showBox' id='not_login'>
                        <p id='title'>login</p>
                        <input type='text' className='inputbox1' id='getusername' placeholder='username...'/>
                        <input type='password' className='inputbox1' id='getpassword' placeholder='password...'/>
                        <button className='inputBox2' onClick={firstLogin}>Login</button>
                        <div className='AutoLogin' onClick={AutoLogin}>
                            <div className='ALLogo'>Pas</div>
                            <p className='ALP'>sign in with Pas</p>
                        </div>
                        <a id='signuplink' href='/signup'>not Register? join us!</a>
                        
                    </div>
                :
                    <div className='showBox showBox2' id='not_login'>
                        <input type='text' className='inputbox1' id='getcode' placeholder='Code...'/>
                        <button className='inputBox2'  onClick={fullLogin}>Submit</button>
                        <a id='signuplink' onClick={AddSite}>not Add? click here!</a>
                    </div>
                )
            :
                <div className='showBox' id='is_login'>
                    <p>hello Dear {username}</p>
                    <button className='inputBox2' onClick={logout}>Logout</button>
                </div>
            }
        </div>
    )
}

export default Home