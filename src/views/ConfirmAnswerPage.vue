<template>
	<div id="mainContainer">
    	<div id="microphoneContainerGoBack">
      		<MainButton @click="goBack" class="itemCentered" id="btnRetour" message="Reformuler"/>
			<div id="iconText">
				<i class="fa-solid fa-microphone"></i>
				<MicrophoneText class="itemCentered" v-bind:message="vocalReformulate"/>
			</div>
    	</div>

    	<textarea class="areaAnswer" id="response" rows="15" cols="30"></textarea>

		<div id="microphoneContainer">
			<MainButton @click="endSurvey" class="itemCentered" message="Valider"/>
			<div id="iconText">
				<i class="fa-solid fa-microphone"></i>
				<MicrophoneText class="itemCentered" v-bind:message="vocalCommand"/>
			</div>
		</div>
	</div>
</template>

<script>
    import router from "../router/index";
    import MainButton from "../components/MainButton.vue";
    import MicrophoneText from "../components/MicrophoneText.vue";
	import SpeechToTextService from '../services/speechToTextService'
	import TextToSpeechService from '../services/textToSpeechService'

    export default {
        name: "ConfirmAnswerPage",
        components: {
        	MainButton,
        	MicrophoneText,
    	},
		data(){
			return{
				position : undefined,
				STTService : new SpeechToTextService(),
				TTSService : new TextToSpeechService(),
				response : undefined,
				vocalReformulate : undefined
			}
		},
		async mounted(){
			this.position = this.$route.params.position
            this.vocalReformulate = 'Pour reformuler votre réponse, cliquez sur le bouton ou dites "Reformuler"'
            this.vocalCommand = 'Pour confirmer votre réponse, cliquez sur le bouton ou dites "Valider"'

			await this.TTSService.textToSpeech(this.vocalReformulate)
			await this.TTSService.textToSpeech(this.vocalCommand)

			var result = await this.STTService.speechToText();
			await this.writeReponse(result)

			this.response = this.$route.params.responseUser;
			let text = document.getElementById("response")
			text.innerHTML = this.response;
		},
		methods : {
			async goBack() {
                await this.TTSService.stopTextToSpeech();
          		router.back()
        	},
			async endSurvey() {
                await this.TTSService.stopTextToSpeech();
				// router.push({ name : 'InstructionPage', params : { position : this.position }})
				router.push('/endPage')
			},
			writeReponse(speechRecognizer){
				speechRecognizer.recognizing = (s, e) => {
            		if(e.result.text.toLowerCase().includes("valider")){
						this.endSurvey()
            		}
					else if(e.result.text.toLowerCase().includes("reformuler")){
						this.goBack()
					}
          		};
			}
		}
    }
</script>
