export const GROUPED_COLUMNS = [
 {Header:'Id',
  accessor:'id'
},
{
    Header:'name',
    columns:[
      {
        Header:'First Name',
        accessor:'first_name'
      },
      {
        Header:'Last Name',
        accessor:'last_name'
      },
    ]
},
{
    Header:'First Name',
    columns:[
        {
            Header:'Date of Birth',
            accessor:'date of birth'
        },
        {
            Header:'Country',
            accessor:'country'
        },
        {
            Header:'Phone',
            accessor:'phone'
        }
    ]
}
]

export const COLUMNS = [
    {Header:1,
     accessor:1
   },
   {
    Header:'First Name',
    accessor:'first_name'
  },
  {
    Header:'Last Name',
    accessor:'last_name'
  },
  {
    Header:'Date of Birth',
    accessor:'date of birth'
},
{
    Header:'Country',
    accessor:'country'
},
{
    Header:'Phone',
    accessor:'phone'
}
//    {
//        Header:'name',
//        columns:[
//          {
//            Header:'First Name',
//            accessor:'first_name'
//          },
//          {
//            Header:'Last Name',
//            accessor:'last_name'
//          },
//        ]
//    },
//    {
//        Header:'First Name',
//        columns:[
//            {
//                Header:'Date of Birth',
//                accessor:'date of birth'
//            },
//            {
//                Header:'Country',
//                accessor:'country'
//            },
//            {
//                Header:'Phone',
//                accessor:'phone'
//            }
//        ]
//    }
   ]