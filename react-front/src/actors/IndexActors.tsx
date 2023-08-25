import { urlPurchase } from "../endpoints";
import { buyDTO } from "../movies/movies.model";
import IndexEntity from "../utils/IndexEntity";

export default function IndexActors() {
    return (
        <IndexEntity<buyDTO>
            title="Purchases" url={`${urlPurchase}/listPurchases`}
        >
            {users => (
                <>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Comment</th>
                            <th>Address</th>
                            <th>Total amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map(user => (
                            <tr key={user.id}>
                                <td>{user.buyAmount}</td>
                                <td>{user.comment}</td>
                                <td>{user.address}</td>
                                <td>{user.finalCost}</td>
                            </tr>
                        ))}
                    </tbody>
                </>
            )}
        </IndexEntity>
    )
}
