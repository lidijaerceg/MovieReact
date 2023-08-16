import { ReactElement, useState } from "react";
import { actorMovieDTO } from "../actors/actors.model";
import { Typeahead } from 'react-bootstrap-typeahead'

export default function TypeAheadActors(props: typeAheadActorsProps){

    const actors: actorMovieDTO[]= [{
        id:1, name:'Lidija', character:'', picture: 'https://static.standard.co.uk/2023/01/17/15/75a76e10b6c61ed60ced79a95b00283aY29udGVudHNlYXJjaGFwaSwxNjc0MDUyNDY3-2.69130963.jpg?width=1200&auto=webp&quality=75'
    },
    {
        id:2, name:'Ana', character:'', picture: 'https://m.media-amazon.com/images/M/MV5BMjAwNTE2MDMyMl5BMl5BanBnXkFtZTgwMjAyODM3MTI@._V1_FMjpg_UX1000_.jpg'
    },
    {
        id:3, name:'Petar', character:'', picture: 'https://flxt.tmsimg.com/assets/263572_v9_bb.jpg'
    },
    ]

    const selected: actorMovieDTO[] = [];

    const [draggedElement, setDraggedElement] = useState<actorMovieDTO | undefined>(undefined)

    function handleDragStart(actor: actorMovieDTO){
        setDraggedElement(actor);
    }

    function handleDragOver(actor: actorMovieDTO){
        if(!draggedElement){
            return;
        }

        if(actor.id !== draggedElement.id){
            const draggedElementInedx = props.actors.findIndex(x => x.id === draggedElement.id);
            const actorIndex = props.actors.findIndex(x=> x.id === actor.id);

            const actors = [...props.actors];
            actors[actorIndex]= draggedElement;
            actors[draggedElementInedx] = actor;
            props.onAdd(actors);
        }
    }


    return(
        <div className="mb-3">
            <label>{props.displayName}</label>
            <Typeahead 
                id="typeahead"
                onChange={actors=>{
                    if(props.actors.findIndex(x=> x.id === actors[0].id)===-1){
                    props.onAdd([...props.actors, actors[0]]);
                    }
                    console.log(actors);
                }}
                options={actors}
                labelKey={actor => actor.name}
                filterBy={['name']}
                placeholder="Write the name of the actor"
                minLength={1}
                flip={true}
                selected={selected}
                renderMenuItemChildren={actor=>(
                    <>
                        <img alt="actor" src={actor.picture}
                            style={{
                                height: '64px',
                                marginRight: '10px',
                                width: '64px'
                            }}
                        />  
                        <span>{actor.name}</span>
                    </>
                )}
            />
            <ul className="list-group">
                {props.actors.map(actor=><li 
                    key={actor.id}
                    draggable={true}
                    onDragStart={()=> handleDragStart(actor)}
                    onDragOver={() => handleDragOver(actor)}
                    className="list-group-item list-group-item-action"
                >
                    {props.listUI(actor)}
                    <span className="badge badge-primary badge-pill pointer text-dark"
                        style={{marginLeft:'0.5rem'}}
                        onClick={() => props.onRemove(actor)}
                    ></span>
                </li>)}
            </ul>
        </div>
    )
}

interface typeAheadActorsProps{
    displayName: string;
    actors: actorMovieDTO[];
    onAdd(actors: actorMovieDTO[]): void;
    onRemove(actors:actorMovieDTO): void;
    listUI(actor: actorMovieDTO): ReactElement;
}