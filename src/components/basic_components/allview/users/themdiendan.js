const themdiendan = () => {
    return (
        <div id="page" class="container-fluid mt-0">
        <div id="page-content" class="row">
            <div id="region-main-box" class="col-12">
                <section id="region-main" class="col-12">
                    <span class="notifications" id="user-notifications"></span>
                    <div role="main"><span id="maincontent"></span><div class="my-1 my-sm-5"></div>
<div class="row justify-content-center">
<div class="col-xl-6 col-sm-8 ">
<div class="card">
    <div class="card-block">
            <h2 class="card-header text-center">Thêm chủ đề trao đổi</h2>
        <div class="card-body">


            <div class="row justify-content-md-center">
                <div class="col-md-8">
                    <form class="mt-3" action="https://lms.iuh.edu.vn/login/index.php" method="post" id="login">                
                        <div class="form-group">
                            <label htmlFor="username" >Chủ đề</label>
                            <input type="text" 
                                class="form-control"
                               />
                        </div>
                        <div class="form-group">
                             <label htmlFor="username" >Nội dung</label>
                            <textarea class="form-control" style={{"min-height": "308px", height: "308px"}}>
                            
                        </textarea>
                        </div>
                        
                       
                                

                        <button type="submit" class="btn btn-primary btn-block mt-3" id="loginbtn">Thêm chủ đề</button>
                    </form>
                </div>

                
            </div>
        </div>
    </div>
</div>
</div>
</div></div>
                    
                </section>
            </div>
        </div>
    </div>
    )
}

export { themdiendan }