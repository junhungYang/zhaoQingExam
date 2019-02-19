<template>
    <div>
        这是报名信息确认页
    </div>
</template>
<script>
import {Req_protocol} from '@/request/request'
export default {
    created() {
        Req_protocol()
    }
}
</script>
