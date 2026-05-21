import { Item } from "../Item/Item";

export const ItemList = ({ lista }) => {
    return (
        <div className="item-list">
            {lista.length ? (
                lista.map((prod) => (

                    <Item key={prod.id} {...prod} >
                        
                        </Item>
                        ))
                        ) : (
                        <p>No hay productos</p>
)}
                    </div>
                );
};