const { reactive } = require("@vue/reactivity");

import Localbase from 'localbase'
import { uid } from 'quasar'
import slugify from 'slugify'
import { i18n } from 'boot/i18n.js'

let db = new Localbase('myRecip')

const state = reactive({
    recips: [],
    category: {id: uid(), parent_id: null, label: '', file: null, slug: '', fab: false},
    recip: { id: uid(), parent_id: '', title: '', ingredients: [], model: '', descriptions: '', file: null, slug: null, created_at: new Date(), another: '',},
    feedback: null,
    themeColor: "#00A3A3",
    search: '',
    isDuplicateName: null,

    
    categorys: [
        {
            id: "ed125f56-c410-473b-8b1f-d6c6c7f6cec9",
            parent_id: null,
            name: '',
            label: 'ALL',
            file: 'https://sweetpeasandsaffron.com/wp-content/uploads/2018/07/7-easy-rice-recipes-HERO-500x500.jpg',
            slug: '',
            fab: false
        },
        {
            id: "f2ed298b-30c6-4741-9d08-82a81636ad08",
            parent_id: null,
            label: 'ENTRES',
            file: 'https://resize.prod.femina.ladmedia.fr/rblr/652,438/img/var/2020-04/plats-les-plus-comande-s.jpg',
            slug: 'entres',
            fab: false
        },
        {
            id: "01607cf0-e39e-426c-88d4-dd1e86b22256",
            parent_id: null,
            label: 'PLATS',
            file: 'https://www.mutuellebleue.fr/conseils-sante-bien-etre/wp-content/uploads/sites/2/2020/07/des-plats-%C3%A9quiliobr%C3%A9s-et-color%C3%A9s.jpg',
            slug: 'plats',
            fab: false
        },
    
        {
            id: "7bede0c7-5518-4c1e-90ef-7a02d3c09cdd",
            parent_id: null,
            label: 'DESERTS', 
            file: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFpzV-M2vIQwJjk2RL2x_tknnyCsoUQSM0g&usqp=CAU',
            slug: 'deserts',
            fab: false
        },
    
        // {
        //     id: uid(),
        //     label: 'drinks',
        //     file: 'https://www.club-sandwich.net/images/photoarticles/fiche-smoothie-pb.jpg',
        //     slug: 'drinks',
        //     fab: false
        // },
    ],
})

const methods = {
    getCollections (){
        db.collection('categorys').get().then(categorys => {
            state.categorys = state.categorys.concat(categorys)
        })
        .then(
            db.collection('recips').orderBy('created_at', 'desc').get().then(recips => {
                state.recips = recips
            })
        )
    
        db.collection('changeTheme').get()
            .then(themeColor => state.themeColor = themeColor[0].themeColor)
            .catch(error => console.log(error))
    },

    changeColor(payload) {
        db.collection('changeTheme').delete()
    
        db.collection('changeTheme').add({themeColor: payload} )
        state.themeColor = payload  
    },
    addIngrediant() {
        const chala = i18n.t('all')
        console.log(chala)
        state.recip.ingredients.push(state.recip.another)
        state.recip.another = ''
        
    },
    
    deleteIngredent(ingredient) {
        state.ingredients = state.ingredients.filter(ing => ing != ingredient)
    },

    addCategory(payload) {

        payload.slug = slugify(payload.label, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
        })
        const category = {
            id: uid(),
            parent_id: null,
            label: payload.label, 
            slug: payload.slug,
            file: payload.file, 
        }
        // console.log(payload)

        db.collection('categorys').add(category)
            .then(state.categorys.push(category))
        
        // const category = JSON.parse(JSON.stringify(payload))
        state.category = {label: '', file: '', slug: ''}
    },

    editCategory(payload) {
        payload.slug = slugify(payload.label, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
        })

        db.collection('categorys').doc({ id: payload.id }).update({
            label: payload.label.toUpperCase(),
            slug: payload.slug,
            file: payload.file
        })

        state.categorys.find(category => {
            if(category.id == payload.id) {
                category.label == payload.label.toUpperCase()
                category.slug == payload.slug
                category.file == payload.file
                category.fab == payload.fab
            }
        }) 
    },

    deleteCategory(payload) {
        // suprimer les recips dans ce category
        state.recips.find(recip => {
            if(recip.parent_id == payload.id) {
                db.collection('recips').doc({ parent_id: payload.id}).delete()
                    .then(state.recips = state.recips.filter(recip => recip.parent_id != payload.id))
            }
        })
        // suprimer le category
        db.collection('categorys').doc({ id: payload.id }).delete()
                .then(state.categorys = state.categorys.filter(category => category.id != payload.id))   
    },
    
    addRecip(payload, category) {
        //creat a slugparams: {name_slug: item.slug} }">
        payload.slug = slugify(payload.title, {
            replacement: '-',
            remove: /[$*_+~.()'"!\-:@]/g,
            lower: true
        })
       
        const recip = {
            id: uid(),
            parent_id: category.id,
            model: category.label,
            title: payload.title,
            another: payload.another,
            ingredients: payload.ingredients,
            descriptions: payload.descriptions,
            feedback: payload.feedback,
            file: payload.file,
            slug: payload.slug,
            created_at: new Date(), 
        }
       
        const myRecip = JSON.parse(JSON.stringify(recip))

        db.collection('recips').add(myRecip)
            .then(state.recips.unshift(recip))
        
        state.recip.id = '',
        state.recip.parent_id = '',
        state.recip.title = '',
        state.recip.another = '',
        state.recip.ingredients = [],
        state.recip.model = '',
        state.recip.descriptions = '',
        state.recip.file = null,
        state.recip.slug = null
    },

    editRecip(payload) {
        state.recips.find(recip => {
            if(recip.id === payload.id) {
                recip.title = payload.title
                recip.another = payload.another
                recip.ingredients = payload.ingredients
                recip.model = payload.model
                recip.descriptions = payload.descriptions
                recip.feedback = payload.feedback
                recip.file = payload.file
                recip.slug = payload.slug

            } 
            const myRecip = JSON.parse(JSON.stringify(payload))

            db.collection('recips').doc({ id: payload.id }).update({
                title: myRecip.title,
                another: myRecip.another,
                ingredients: myRecip.ingredients,
                model: myRecip.model,
                descriptions: myRecip.descriptions,
                feedback: myRecip.feedback,
                file: myRecip.file,
                slug: myRecip.slug
            })
        })
    },

    //delete recips
    deleteRecip(payload){
        db.collection('recips').doc({ id: payload.id }).delete()
            .then(state.recips = state.recips.filter(recip => recip.id != payload.id))
        
    },

    required(propertyType) {
        return v => v && v.length > 0 || `${propertyType} is required`
    },

    duplicateName(propertyType ) {
        return v => v !== state.isDuplicateName || `You must add another ${propertyType}, this name exists`
    },

    minLength(propertyType, minLength){
        return v => v && v.length >= minLength || `${propertyType} must be minimum ${minLength} caracter`
    },

    toUppercase(payload) {
        return payload.label = payload.label.toUpperCase()
    },
    toUppercaseRecip(payload) {
        return payload.title = payload.title.toUpperCase()
    },
    isSameCategory(payload) { 
        state.isDuplicateName = null
        state.categorys.find(category => {
            if(category.label === payload.label) {
                return state.isDuplicateName = category.label
            } 
            console.log(state.isDuplicateName)
        })
    },

    isSameRecip(payload) {
        state.isDuplicateName = null
        state.recips.find(recip => {
            if(recip.title === payload.title) {
                return state.isDuplicateName = recip.title
            } 
            console.log(state.isDuplicateName)
        })
    }
    
}

const getters = {
    allRecipFilter() {
        return state.recips.filter(recip => {
            return recip.title.toLowerCase().includes(state.search.toLowerCase())
        })
    },
    categorys(payload) {
        return state.recips.filter(recip => recip.model == payload)
    },
    filteredRecipe(payload) {
        return this.categorys(payload).filter(recip => {
          return recip.title.toLowerCase().includes(state.search.toLowerCase())
        })
    },

    categorysAndRecips() {
        const categorysAndRecips = state.categorys.concat(state.recips)
        return categorysAndRecips
    },

    nested(categorys) {
        const nest = (categorys, id = null, link = 'parent_id') => categorys.filter(category => category[link] === id)
          .map(category => ({ ...category, recips: nest(categorys, category.id) }))

        return nest(categorys)
    }
    
}
export default {
    state,
    methods,
    getters
}