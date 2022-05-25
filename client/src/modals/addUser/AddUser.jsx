import './addUser.css'

export const AddUser = ({open,closeWindow}) => {

    if(!open)
        return null

  return (
    <div className="overlay">
        <div className='userModal'>
            <h2>Add A user</h2>
            <from className="userForm">
                <input type="text" placeholder="FullName" name="fullName"/>
                <input type="text" placeholder="id" name="id"/>
                <input 
                    type="text" 
                    placeholder="phone Number"
                    name="phone Number"
                />
                <input type="text" placeholder="ip" name="ip"/>
                <button type="submit">Submit</button>
            </from>
            <button className='closeButton' onClick={closeWindow} >
                Close
            </button>
        </div>
    </div>
  )
}
