import React from 'react'

const Form = () => {
  return (
    <div>
        <form
          name="get-to-know-your-client"
          //className={styles["form"]}
        >
          <input
            id="email"
            name="email"
            placeholder="Email"
            // onChange={(event) => setEmail(event.target.value)}
            // className={styles["email"]}
          />
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="off"
            placeholder="Password"
            // onChange={(event) => setPassword(event.target.value)}
            // className={styles["password"]}
          />
            <>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="off"
                placeholder="Confirm password"
                // onChange={(event) => setConfirmPassword(event.target.value)}
                // className={styles["confirmPassword"]}
              />
            </>
          <button type="submit" 
        //   className={styles["submit"]}
          >
            Submit
          </button>
        </form>
    </div>
  )
}

export default Form