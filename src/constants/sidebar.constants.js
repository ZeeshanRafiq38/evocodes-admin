const menuItems = [
    {
        id : 1 , 
        name : 'Dashboard' ,
        path : '/app' , 
        icon : 'home' ,
        exact : true ,
    } ,
    {
        id : 2 , 
        name : 'Blogs Management' ,
        path : '/app/blogs' ,
        icon : 'swatchbook',
        exact : false ,
    } ,
    {
        id : 3 , 
        name : 'Locations' ,
        path : '/app/locations' ,
        icon : 'location-point' ,
        exact : false 
    },
    {
        id: 4,
        name: 'Enquiries',
        path: '/app/enquiries',
        icon: 'envelope',
        exact: false,
    }
   
]


export default menuItems;
