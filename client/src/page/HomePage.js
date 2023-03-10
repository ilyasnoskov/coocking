import React, {useContext, useEffect} from 'react';
import {Button, Form, FormControl, Image, Row} from "react-bootstrap";
import {useCallback, useState} from "react";
import {Context} from "../index";
import jwtDecode from "jwt-decode";
import {createParams, fetchParams} from "../http/paramsAPI";
import {observer} from "mobx-react-lite";
import {fetchOneRecipe, fetchRecipes} from "../http/recipeAPI";
import {NavLink, useParams} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import RecipeItem from "../components/RecipeItem";

const ChickpeaCurry = observer(() => {

    const {recipe} = useContext(Context)

    useEffect(() => {
        fetchRecipes().then(data => recipe.setRecipes(data.rows))
    },[])


    const {params} = useContext(Context)

    useEffect(() => {
        fetchParams().then(data => params.setParams(data))
    },[])



        // console.log([...new Map(newRecipes.map(item => [item['id'], item])).values()])

        // console.log(newRecipes)

    const [isMenu, setMenu] = useState(false)
    const [height, setHeight] = useState()
    const [weight, setWeight] = useState()
    const [age, setAge] = useState()
    const [calories, setCalories] = useState(0);
    let user = jwtDecode(localStorage.getItem('token'))

    // let isMenu = true

    let addParam = () => {
        const formData = new FormData()
        formData.append('height', height)
        formData.append('weight', weight)
        formData.append('age', age)
        formData.append('norm', `${Math.round(calories)}`)
        formData.append('userId', `${user.id}`)
        createParams(formData).then()
    }
    const [gender, setGenderState] = useState('');
    const [activity, setActivityState] = useState('');
    const [product, setProduct] = useState('');
    let [products, setProducts] = useState([]);

    const newRecipes = [];




    for (let i = 0; i < recipe.recipes.length; i++) {
        let temp = 0;
        for (let j = 0; j < recipe.recipes[i].info.length; j++) {
            // console.log(recipe.recipes[i].info[j].description)
            if(products.includes(recipe.recipes[i].info[j].description)) temp++;
        }
        // console.log(temp);
        if(!temp) newRecipes.push(recipe.recipes[i]);
    }

    console.log(newRecipes)

    let Rec1 = []
    let Rec2 = []
    let Rec3 = []

    newRecipes.map(i => {
        if (i.type === 1) {
            Rec1.push(i)
        }else if (i.type === 2){
            Rec2.push(i)
        }else if (i.type ===3){
            Rec3.push(i)
        }
    })

    console.log(Rec1)
    console.log(Rec2)
    console.log(Rec3)

    let finalRecipes = [Rec1[0],Rec2[0],Rec3[0]]


    let handleParametersChange = () => {

        if (gender === "male") {
            setCalories(activity*(9.99*weight+6.25*height-4.92*age+5));
        } else {
            setCalories(activity*(9.99*weight+6.25*height-4.92*age-161));
        }

    }

    return (
        <div>
            <div className="cal__section">
                <div className="container">
                    <div className="menu__header">
                        <h2 className="section__title">???????????????????? ?????????????? ?????????? ??????????????</h2>
                    </div>
                    <div className="calories">
                        <Form className='d-flex flex-column'>
                            <div>
                                <label htmlFor="ingredients__count">?????????????? ???????? ??????????</label>
                            </div>
                            <div>
                                <select className='select' onChange={(e)=>{
                                    const selectedGender=e.target.value;
                                    setGenderState(selectedGender);
                                }}>
                                    <option value="male">??????????????</option>
                                    <option value="female">??????????</option>
                                </select>
                            </div>
                            <div className="enter__cal">
                                <FormControl
                                    className='enter__text__cal'
                                    placeholder="?????????????? ?????? ??????"
                                    value={age}
                                    onChange={e => setAge(e.target.value)}
                                />
                                <FormControl
                                    className='enter__text__cal'
                                    placeholder="?????????????? ?????? ??????????"
                                    value={height}
                                    onChange={e => setHeight(e.target.value)}
                                />
                                <FormControl
                                    className='enter__text__cal'
                                    placeholder="?????????????? ???????? ????????"
                                    value={weight}
                                    onChange={e => setWeight(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="ingredients__count">?????????????? ?????? ???????????? ????????????????????</label>
                            </div>
                            <div>
                                <select className="select" onChange={(e)=>{
                                    const selectedActivity=e.target.value;
                                    setActivityState(selectedActivity)
                                }}>
                                    <option value="1.2">?????????????????????? ???????????? (?????????????????? ???????? / ????????????????)</option>
                                    <option value="1.375">???????????? ????????????????????, ?????????? ???????????????????? ???? 3 ?????????? ???? ??????????????</option>
                                    <option value="1.55">?????????????? ????????????????????, ?????????????????? ???????????????????? 3-5 ?????????? ???? ??????????????</option>
                                    <option value="1.725">???????? ?????????????? ????????????, ???????????????????? ???????????????????? 6-7 ?????????? ???? ??????????????</option>
                                    <option value="1.9">???????????????? ????????????????????</option>
                                </select>
                            </div>
                            <div className="enter__cal">
                                <FormControl
                                    className='enter__text__cal'
                                    placeholder="?????????????? ?????????????????? ??????????????"
                                    value={product}
                                    onChange={e => setProduct(e.target.value)}
                                />
                            </div>
                            <Row className='d-flex justify-content-between pl-3 pr-3'>
                                <Button
                                    className='cal__button'
                                    variant={"outline-dark"}
                                    onClick={() => setProducts([...products, product])}
                                >
                                    {"???????????????? ??????????????"}
                                </Button>
                            </Row>
                            <Row className='d-flex justify-content-between pl-3 pr-3'>
                                <Button
                                    className='cal__button'
                                    variant={"outline-dark"}
                                    onClick={() => handleParametersChange()}
                                >
                                    {"?????????????????????? ???????????? ?????????? ??????????????"}
                                </Button>
                                <Button
                                    className='cal__button'
                                    variant={"outline-dark"}
                                    onClick={()=>addParam()}
                                >
                                    {"???????????????? ????????"}
                                </Button>
                                <Button
                                    className='cal__button'
                                    variant={"outline-dark"}
                                    onClick={()=> {
                                        setMenu(true)
                                    }}
                                >
                                    {"???????? ???? ????????"}
                                </Button>
                            </Row>
                            {"???????????? ?????????? ??????????????: "}
                            <div>
                                {Math.round(calories)}
                            </div>
                            <div className='wrapper'>
                            {isMenu ?
                                finalRecipes.map(i=>
                                        <RecipeItem className='d-flex' key={i.id} recipe={i}/>
                                ) :
                                <div>

                                </div>
                            }
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ChickpeaCurry;