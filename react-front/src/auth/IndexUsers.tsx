import axios from "axios";
import { urlAccounts } from "../endpoints";
import Button from "../utils/Button";
import IndexEntity from "../utils/IndexEntity";
import customConfirm from "../utils/customConfirm";
import { userDTO } from "./auth.model";
import Swal from "sweetalert2";

export default function IndexUsers(){

    async function makeAdmin(id: string){
        await doAdmin(`${urlAccounts}/makeAdmin`, id);
    }

    async function removeAdmin(id: string){
        await doAdmin(`${urlAccounts}/removeAdmin`, id);
    }

    async function doAdmin(url: string, id: string){
        await axios.post(url, JSON.stringify(id), {
            headers: {'Content-type': 'application/json'}
        });

        Swal.fire({
            title: 'Success',
            text: 'Operation finished correctly',
            icon: 'success'
        });
    }

    async function makeSalesperson(id: string){
        await doSalesperson(`${urlAccounts}/makeSalesperson`, id);
    }

    async function removeSalesperson(id: string){
        await doSalesperson(`${urlAccounts}/removeSalesperson`, id);
    }

    async function doSalesperson(url: string, id: string){
        await axios.post(url, JSON.stringify(id), {
            headers: {'Content-type': 'application/json'}
        });

        Swal.fire({
            title: 'Success',
            text: 'Operation finished correctly',
            icon: 'success'
        });
    }


    async function makeBuyer(id: string){
        await doBuyer(`${urlAccounts}/makeBuyer`, id);
    }

    async function removeBuyer(id: string){
        await doBuyer(`${urlAccounts}/removeBuyer`, id);
    }

    async function doBuyer(url: string, id: string){
        await axios.post(url, JSON.stringify(id), {
            headers: {'Content-type': 'application/json'}
        });

        Swal.fire({
            title: 'Success',
            text: 'Operation finished correctly',
            icon: 'success'
        });
    }

    return(
        <IndexEntity<userDTO>
            title="Users" url={`${urlAccounts}/listUsers`}
        >
            {users => <>
                <thead>
                    <tr>
                        <th></th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {users?.map(user => <tr key={user.id}>
                        <td>
                            <Button
                                onClick={()=> customConfirm(() => makeAdmin(user.id),
                                    `Do you wish to make ${user.email} an admin?`, 'Do it' )}
                            >Make Admin</Button>
                            <Button className="btn btn-danger ms-2"
                                onClick={()=> customConfirm(() => removeAdmin(user.id),
                                    `Do you wish to remove ${user.email} as an admin?`, 'Do it' )}
                            >Remove Admin</Button>



                            <tr>
                            <Button
                                onClick={()=> customConfirm(() => makeSalesperson(user.id),
                                    `Do you wish to make ${user.email} an salesperson?`, 'Do it' )}
                            >Make Salesperson</Button>
                            <Button className="btn btn-danger ms-2"
                                onClick={()=> customConfirm(() => removeSalesperson(user.id),
                                    `Do you wish to remove ${user.email} as an Salesperson?`, 'Do it' )}
                            >Remove Salesperson</Button>
                            </tr>

                            <tr>
                            <Button
                                onClick={()=> customConfirm(() => makeBuyer(user.id),
                                    `Do you wish to make ${user.email} an buyer?`, 'Do it' )}
                            >Make Buyer</Button>
                            
                            </tr>
                        </td>
                        <td>
                            {user.email}
                        </td>
                        <td>
                            {user.role}
                        </td>
                    </tr>)}
                </tbody>
            </>}
        </IndexEntity>
    )
}