<template>
    <div class="searchComp">
        <div class="left">
            <i class="search-i"></i>
            <select
                    name="searchType"
                    v-model="type"
                    :disabled="searchType.length == 1"
                    :style="{background: searchType.length == 1 ? 'none' : ''}"
            >
                <option v-for="item in searchType" :value="item.value">{{item.typeName}}</option>
            </select>
        </div>
        <div class="input-container">
            <input type="text" :placeholder="placeholder" v-model="word">
        </div>
        <button class="submit" @click="search()">确认</button>
    </div>
</template>

<script>
    export default {
        props: [
            'searchType',
            'placeholder'
        ],
        data () {
            return {
                word: '',
                type: ''
            }
        },
        created () {
            this.type = this.searchType[0].value
        },
        methods: {
            search () {
                this.$emit('search', {type: this.type, word: this.word})
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../css/_base.scss";
    .searchComp {
        display: flex;
        height: 3.8rem;
        overflow: hidden;
        .left {
            width: 32%;
            height: 100%;
            padding: 0 1.5% 0 3%;
            box-sizing: border-box;
            border: 0.1rem solid #e8e8e8;
            display: flex;
            align-items: center;
            -webkit-box-pack: justify;
            justify-content: space-around;
            border-top-left-radius: 1rem;
            border-bottom-left-radius: 1rem;
            i {
                display: block;
            }
        }
        select {
            padding: 0.4rem 0;
            @include customSelect("../img/arrowDown-i_03.png", 0.75rem);
            color: #8e8e8e;
            font-size: 1.2rem;
            font-weight: bold;
            line-height: 1;
            text-align: center;
        }
        .input-container {
            flex: 1;
            border-top: 0.1rem solid #e8e8e8;
            border-bottom: 0.1rem solid #e8e8e8;
        }
        input {
            width: 100%;
            font-size: 1.2rem;
            line-height: 1.4rem;
            padding: 1.2rem 0 1.2rem 6%;
            box-sizing: border-box;
        }
        .submit {
            height: 100%;
            width: 19%;
            background: $cl-i;
            color: #ffffff;
            font-size: 1.3rem;
            border-top-right-radius: 1rem;
            border-bottom-right-radius: 1rem;
        }
    }
</style>
