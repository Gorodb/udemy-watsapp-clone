import {StyleSheet} from "react-native";
import {PageTitle} from "../components/page-title/PageTitle";
import {PageContainer} from "../components/page-container/PageContainer";

export const SettingsScreen = props => {
  return (
    <PageContainer style={styles.container}>
      <PageTitle text="Settings screen"/>
    </PageContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})