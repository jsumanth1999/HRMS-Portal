
export const data = [{
    name: "Employee",
    childrens: [
        {
            name: "Profile",
            link: "/profile"
        },
        {
            name: "Contact",
            link: "/contact"
        }, {
            name: "Inputs",
            link: "#"
        }
    ]
}, {
    name: "Holidays",
    link: "/holidays"
}, {
    name: "Leaves",
    childrens: [
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "History",
            link: "/history"
        }
    ]
},{
    name: "User Management",
    link: "/usermanagement"
},
{
    name: "Sign In",
    link:"/login"
}];

export const tabData = {
    tabs: [
        {
            id: "address",
            name: "Address",
            content: "addressDetails",
            modalData: "formDetails"
        },
        {
            id: "others",
            name: "Others",
            content: "otherdetails",
            modalData: "otherDetails"
        },
    ]
};
