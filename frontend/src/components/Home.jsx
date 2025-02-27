import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { userLoginAtom } from '../store/atom/user'
import Button from './utils/Button';
import { useNavigate } from 'react-router-dom';
import axios  from 'axios';
import debounce from 'lodash.debounce';

const Home = () => {
    const loginUser=useRecoilValue(userLoginAtom);
    console.log("inside the home",JSON.stringify(loginUser));

    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/bulk?filter=" + filter)
            .then(response => {
                setUsers(response.data.user)
            })
    }, [])

   // Function to fetch search results
    const fetchResults = async (searchQuery) => {
        try {
        const response = await axios.get(`http://localhost:3000/api/v1/bulk?filter=${searchQuery}`);
        setUsers(response.data.user);
        } catch (error) {
        console.error('Error fetching results:', error);
        }
    };

     // Create a debounced version of the fetchResults function
  const debouncedFetchResults = useCallback(debounce(fetchResults, 500), []);

  const handleChange = (event) => {
    const { value } = event.target;
    setFilter(value);
    debouncedFetchResults(value);
  };

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input onChange={handleChange} type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} />)}
        </div>
    </>
}


function User({user}) {
  const loginUser=useRecoilValue(userLoginAtom);
  const navigate = useNavigate();
  return <div className="flex justify-between">
      <div className="flex">
          <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
              <div className="flex flex-col justify-center h-full text-xl">
                  {user.firstName[0]}
              </div>
          </div>
          <div className="flex flex-col justify-center h-ful">
              <div>
                  {user.firstName} {user.lastName}
              </div>
          </div>
      </div>

      <div className="flex flex-col justify-center h-ful">

    {loginUser.isLoggedIn ? <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName);
            }} label={"Send Money"} /> : null}

      
      </div>
  </div>
}

export default Home