const Contact=()=>{
    return(
        <section id="contect" className="contect-pic">
        <h1 className="h-primary center">
            Contect Us</h1>
        <div id="contect-box">
            <form action="">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="text" placeholder="Enter your neme "/>
                </div>
                <div className="form-group">
                    <label htmlFor="Email">Email: </label>
                    <input type="email" id="mail" placeholder="Enter your Email "/>
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone: </label>
                    <input type="phone" id="phone" placeholder="Enter your Phone "/>
                </div>
                <div className="form-group">
                    <label htmlFor="massage">Massage: </label>
                    <textarea name="massage" id="massage" cols="30" rows="10"></textarea>
                </div>
                <button className="btn">submit</button>


            </form>
        </div>
    </section>
    )
}
export default Contact;