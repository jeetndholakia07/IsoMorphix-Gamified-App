export const tableColumns = [
    {
        id: "Position",
        cell: () => { return <i className="bi bi-award text-yellow-500 text-center text-2xl font-bold" /> }
    },
    {
        header: "Avatar",
        cell: () => { return <i className="bi bi-person-circle text-2xl text-white text-center font-bold" /> }
    },
    {
        header: "Rank",
        accessorFn: (row: any) => row.rank
    },
    {
        header: "User Name",
        accessorFn: (row: any) => row.username
    },
    {
        header: "Country Flag",
        cell: () => { return <img src="https://flagsapi.com/IN/shiny/64.png" loading="lazy" alt="India Flag" className="text-white text-lg text-center w-10" /> }
    },
    {
        header: "Country Name",
        accessorFn: (row: any) => row.country
    },
    {
        header: "Score",
        accessorFn: (row: any) => row.score
    },
];