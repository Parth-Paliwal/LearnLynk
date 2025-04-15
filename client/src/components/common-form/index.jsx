import { Button } from "../ui/button"
import FormControls from "./form-controls"


function CommonForm({ handleSubmit,
       buttonText,
      formControls = [], 
      formData = {},
       setFormData ,
       isButtonDisabled = false
    }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControls formControls={formControls} formData={formData} setFormData={setFormData} />
        <Button disabled={isButtonDisabled} className="mt-5 w-full " type="submit">{buttonText || 'Submit'}</Button>
      </form>
    </div>
  );
}
  
  export default CommonForm;
  