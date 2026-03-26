  import { useLiveQuery } from "dexie-react-hooks";
  import { useState, type ChangeEvent } from "react";
  import { Button } from "../components/ui/button";
  import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
  import { Input } from "../components/ui/input";
  import { Label } from "../components/ui/label";
  import {  Link } from "react-router-dom";
  import { db } from "../db";
  import { useNavigate } from "react-router-dom";
  import ButtonSocialIconDemo from "../components/ui/social-icon";
  export default function Register() {

    const employeesdata = useLiveQuery(() => db.employeeslogin.toArray());
    const [username,setUsername]=useState('');
    const [emailid,setEmailid]=useState('');
    const [password,setPassword]=useState('');
    const [conformpaw,setConformpaw]=useState('');
    const [_, setStatus] = useState<string>("")
    const navigate = useNavigate();
    const [error,setError]=useState({
      username: "",
      email: "",
      password: "",
      confirm: "",
      success: "",
      duplicate:""
    })
    console.log(employeesdata)
  const emailRegex=/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\.[a-zA-Z]{2,}$/
  const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    
    async function handlesavedb():Promise<void> {
     
      let newErrors = {
        username: "",
        email: "",  
        password: "",
        confirm: "",
        success: "",
        duplicate:""
      };
      const duplicatedata=employeesdata?.find(item=>item.emailid === emailid)
      if(duplicatedata){
        newErrors.duplicate="You already have an account"
        setError(newErrors);
        return
      }
        if(username.trim()===""){
          newErrors.username="Enter full name"
      }
      if(emailid===""){ 
        newErrors.email="Enter Emailid"
      }else if(!emailRegex.test(emailid)){
            newErrors.email="Enter Correct Format "
      }
      if(password===""){
            newErrors.password="Enter password"
      }else if(!passwordRegex.test(password)){
        newErrors.password="Enter Correct Format Password"
      }
      if(password!==conformpaw){
        newErrors.confirm='Enter Same Password'
      }
      setError(newErrors);
    if(newErrors.username || newErrors.email ||newErrors.password || newErrors.confirm||newErrors.duplicate){
      return;
    }else{
      navigate('/login')
    }

   
      try{
        const id=await db.employeeslogin.add({
          username,
          emailid,
          password,
        })
        setUsername('');
        setEmailid('');
        setPassword('');
        setConformpaw('');
        setStatus("data store in db")
        console.log(id)
      }
      catch(error){
        setStatus('db store error')
        }
    }
    return (
      <>
      <div className="flex min-h-screen w-full bg-gray-200 ">
      <div className='hidden lg:block lg:basis-1/2 bg-muted'>
        <img src='/images.png' className='h-full w-full '></img>
      </div>
      
        <div className='flex w-full basis-full lg:basis-1/2 justify-center items-center px-4'>
        <Card className="mx-auto min-w-sm lg:min-w-lg">
          <CardHeader className='flex flex-col items-center'>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>Enter Your Information To Create An Account</CardDescription>
          </CardHeader>
          <CardContent>
            
            <div className="grid gap-4">
              {error.duplicate && <p className="text-red-500 flex justify-center border-2 bg-red-300 py-2">{error.duplicate}</p>}
              <div className="grid grid-cols-1 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="first-name">Full Name</Label>
                  <Input id="first-name"  placeholder="Max" required value={username} onChange={(e:ChangeEvent<HTMLInputElement>)=>{setUsername(e.target.value)}} />
                    {error.username && <p className="text-red-600 font-semibold text-sm">{error.username}</p>}
                </div>
                {/* <div className="grid gap-2">
                  <Label htmlFor="last-name">Last name</Label>
                  <Input id="last-name" name="lastname" placeholder="Robinson" required value={username.lastname} onChange={handleChange} />
                </div> */}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={emailid} required onChange={(e:ChangeEvent<HTMLInputElement>)=>{setEmailid(e.target.value)}} />
                {error.email && <p className="text-red-500 font-semibold ">{error.email}</p>}

              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} required onChange={(e:ChangeEvent<HTMLInputElement>)=>{setPassword(e.target.value)}} />
                  {error.password && <p className="text-red-600 font-semibold  text-sm">{error.password}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Confirm Password</Label>
                <Input id="password" type="password" value={conformpaw} required onChange={(e:ChangeEvent<HTMLInputElement>)=>{setConformpaw(e.target.value)}}  />
                  {error.confirm && <p className="text-red-600 font-semibold  text-sm">{error.confirm}</p>}
              </div>
              <Button type="submit" className="w-full cursor-pointer" onClick={handlesavedb}>Create an account</Button>
            </div>
            <div className="mt-4 text-center text-sm ">
              Already have an account?{" "}
              <Link to='/login'  className="underline hover:text-red-500">Sign in</Link>
              {/* <a href="/login" className="underline">Sign in</a> */}
            </div>
             <div className="mt-4">
            <ButtonSocialIconDemo />
          </div>
          </CardContent>
        </Card>
        </div>
      </div>
      </>
    )
  }
