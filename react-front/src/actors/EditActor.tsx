import ActorForm from "./ActorForm";

export default function EditActor(){
    return(
        <>
            <h3>Edit actor</h3>
            <ActorForm model={{name: 'Margot Robbie', dateOfBirth: new Date('1991-06-01T00:00:00 '),
                biography: `# Something
                This person was born in **Australia**`,
                pictureURL: 'https://img.rasset.ie/001e24b1-1600.jpg'
            }}
                onSubmit={values => console.log(values)}
            />
        </>
    )
}