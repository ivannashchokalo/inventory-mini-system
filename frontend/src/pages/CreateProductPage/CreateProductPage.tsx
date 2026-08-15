import CreateProductForm from "../../components/forms/CreateProductForm";
import styles from "./CreateProductPage.module.css";

export default function CreateProductPage() {
  return (
    <>
      <h1 className={styles.title}>Create product</h1>
      <CreateProductForm />
    </>
  );
}
