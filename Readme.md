# CPX Research SDK React Native

**Monetize your product with fun surveys.**

We will make it easy for you: Simply implement our solution and be ready to start monetizing your product immediately!
Let users earn your virtual currency by simply participating in exciting and well paid online surveys!

This SDK is owned by [MakeOpinion GmbH](http://www.makeopinion.com).

[Learn more.](https://www.cpx-research.com/main/en/)

# Table of Contents

- [Preview](#preview)
- [Installation](#installation)
- [Usage](#usage)
- [For Developers](#for-developers)

# Preview
![Preview](preview.png "Preview")

# Videotutorial
Click the Image to watch a step-by-step tutorial on how to use the sdk

[![Watch a step by step tutorial](http://img.youtube.com/vi/7ogCbAuai6U/0.jpg)](http://www.youtube.com/watch?v=7ogCbAuai6U "cpx-research.com Tutorial React Native Integration - Monetize your App or Website")

# Installation

1. Install the SDK like any other npm package, using yarn or npm
``` 
yarn add cpx-research-sdk-react-native

# or

npm install cpx-research-sdk-react-native

# ATTENTION: if you are using React Native upwards version 0.65.3 then you need to use an updated version:

npm install cpx-research-sdk-reactnative-new

```

2. Since the CPX Research SDK uses the react-native-webview with native code functionality, you need to install this package as well.
``` 
yarn add react-native-webview

# or

npm install react-native-webview
```

3. Automatically install the react-native-webview pods
``` 
cd ios
pod install
```

4. Now import the package in your JavaScript files and use it like any other React Component.
```javascript
import CpxResearch from "cpx-research-sdk-react-native";
```

# Usage

## Getting Started (Easy)

### Basic Configuration
Customize every CPX Widget as it fits your needs.
Below are all required/basic configuration options for the CPX Widget. There are a few additional ones, but more on that later.

Note: If you don't pass a configuration for any of the corner, sidebar or notification widgets, these specific widgets will then not be displayed.
```jsx
<CpxResearch
  accentColor="#ff9800"  // the accent color for the browser/webview icons an progress bars
  appId="1"
  userId="2"
  isHidden={isCpxLayerHidden}  // in case you want to hide the widget completely, simplye pass a boolean (for example a state variable).
  cornerWidget={{
    backgroundColor: "#ff9800",
    position: "topright",
    roundedCorners: 0,
    size: 100,
    text: "Click me",
    textColor: "#ffffff",
    textSize: 12,
  }}
  notificationWidget={{
    backgroundColor: "#ff9800",
    height: 60,
    isSingleSurvey: true,
    position: "bottom",
    roundedCorners: 10,
    text: "Click me",
    textColor: "#ffffff",
    textSize: 12,
    width: 300,
  }}
  sidebarWidget={{
    backgroundColor: "#ff9800",
    height: 240,
    position: "left",
    roundedCorners: 10,
    text: "Click me",
    textColor: "#ffffff",
    textSize: 12,
    width: 60,
  }}
/>
```

### Only Specific Views
To display the CPXResearch Widget only in specific views, simply add it inside those views (for example in a specific page/route in your app).
The CPX Widget will take the available space.

Here is an example using React Navigation, where the CPX Widget is only displayed on the Home Page 
(for further details please have a look at the demo app in the demo_app sub folder. There you will find this exact example).
```jsx
// App.jsx

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}  // The CPX Widget is embedded in this component
        options={{ header: () => <Header title="CPX React Native Demo"/> }}
      />
      <Stack.Screen
        name="Page 2"
        component={Page2Screen}
        options={{ header: () => <Header title="Demo App Page 2"/> }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
```

```jsx
// Home.screen.jsx

const HomeScreen = () => (
  <>
      <CpxResearch
        appId="1"
        userId="2"
        accentColor="#ff9800"
        cornerWidget={{ /* ... */ }}
        notificationWidget={{ /* ... */ }}
        sidebarWidget={{ /* ... */ }}
      />
      <SafeAreaView style={/* ... */}>
        <View style={/* ... */}>
          <Text>React Native SDK Demo App</Text>
          <Text>CPX Research</Text>
        </View>
      </SafeAreaView>
    </>
);
```

### Entire App Overlay
For an entire app overlay add the CPX Widget next to your root component, using a fragment, like in the example below:
```jsx
const App = () => (
  <>
    <CpxResearch
      appId="1"
      userId="2"
      accentColor="#ff9800"
      cornerWidget={{ /* ... */ }}
      notificationWidget={{ /* ... */ }}
      sidebarWidget={{ /* ... */ }}
    />
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}  // No CPX Widget anymore in this component
          options={{ header: () => <Header title="CPX React Native Demo"/> }}
        />
        <Stack.Screen
          name="Page 2"
          component={Page2Screen}
          options={{ header: () => <Header title="Demo App Page 2"/> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </>
);
```

### Adding an additioanl info

If you want to add an additional info like subid_1 & subid_2 paramters, you will need to append it like the following:

```jsx
const App = () => (
  <>
    <CpxResearch
      appId="1"
      userId="1"
      add_info="&subid_1=123&subid_2=345"
      accentColor="#ff9800"
      cornerWidget={
        {
          /* ... */
        }
      }
      notificationWidget={
        {
          /* ... */
        }
      }
      sidebarWidget={
        {
          /* ... */
        }
      }
    />
  </>
);
```

## Getting Started (Expert)
As stated above, it is possible to not pass any configuration for the corner, sidebar or notification widgets, which then means none of them will be displayed.
This might be especially useful if you want to build your own widgets/components. 
For this use-case, the SDK provides multiple callbacks/methods where you can get the required data:

Now handle the CPXResearch Response with the listeners below and use your own Widgets to display the surveys.
```jsx
const HomeScreen = () =>
{
  /**
   * Create refs for the methods the SDK provides and bind them like shown below.
   * Then you can call them like any other function (have a look at the TouchableOpacity Buttons below)
   */
  const markTransactionAsPaidRef = useRef();
  const fetchSurveysAndTransactionsRef = useRef();
  const openWebViewRef = useRef();
  
  /**
   * Add the change callbacks for the surveys and transactions updates
   */
  const onSurveysUpdate = surveys =>
  {
    console.log("onSurveysUpdate Callback", surveys);
  };

  const onTransactionsUpdate = transactions =>
  {
    console.log("onSurveysUpdate Callback", transactions);
  };

  const onWebViewWasClosed = () =>
  {
    console.log("onWebViewWasClosed Callback");
  };

  return (
    <>
      <CpxResearch
        /* ... */
        // add the callback methods:
        onSurveysUpdate={onSurveysUpdate}  // will be called when the surveys updated
        onTransactionsUpdate={onTransactionsUpdate}  // will be called when the transactions updated
        onWebViewWasClosed={onWebViewWasClosed}  // will be called when the user closed the webView
        // bind the refs:
        bindMarkTransactionAsPaid={markTransactionAsPaid => markTransactionAsPaidRef.current = markTransactionAsPaid}
        bindFetchSurveysAndTransactions={fetchSurveysAndTransactions => fetchSurveysAndTransactionsRef.current = fetchSurveysAndTransactions}
        bindOpenWebView={openWebView => openWebViewRef.current = openWebView}
        /* ... */
      />
      <SafeAreaView style={styles.appWrapper}>
        <View style={styles.viewContainer}>
          { /* use the refs */ }
          <TouchableOpacity style={styles.button} onPress={() => fetchSurveysAndTransactionsRef.current?.()}>
            <Text style={styles.buttonText}>Fetch surveys and transactions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => markTransactionAsPaidRef.current?.("123", "345")}>
            <Text style={styles.buttonText}>Mark Transaction as paid</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => openWebViewRef.current?.(/* pass optional surveyId here */)}>
            <Text style={styles.buttonText}>Open Webview</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
```

**Note**: For a typescript example have a look at the demo app in the demo_app sub folder

## Using the SurveyCards Widget
The CPXSurveyCards Widget can be configured as follows:
```jsx
import { CpxSurveyCards } from "cpx-research-sdk-react-native";

<CpxSurveyCards
    surveys={surveys}
    texts={texts}
    config={{
      accentColor: "#41d7e5",
      cardBackgroundColor: "white",
      inactiveStarColor: "#dfdfdfff",
      starColor: "#ffc400",
      textColor: "black"
    }}
    openWebView={openWebViewRef.current}
/>
```
For the surveys, texts and the openWebView function props we need to use the features described in the 
[Getting Started (Expert)](#getting-started-(expert)) section. 

1) Assign the openWebView with the bindOpenWebView callback function provided by 
the main CPXResearch component as show in the [Getting Started (Expert)](#getting-started-(expert)) section and simply pass the openWebViewRef.current 
as a prop to the CpxSurveyCards.
2) For the surveys and texts, use a local state (or any state management pattern of your choice) to store them in your application state.
Then simply use to onSurveysUpdate and onTextsUpdate callback functions to get the texts and survey and store them in your application state.
Now you can pass them to the CpxSurveyCards as well.

Below you can see an example implementation (note that only the relevant lines of code for the CpxSurveyCards are shown):

```jsx
const YourApp = () =>
{
  const openWebViewRef = useRef();

  const [surveys, setSurveys] = useState([]);
  const [texts, setTexts] = useState();

  return (
    <>
      <CpxResearch
        /* ... */
        onSurveysUpdate={surveys => setSurveys(surveys)}
        onTextsUpdate={texts => setTexts(texts)}
        bindOpenWebView={openWebView => openWebViewRef.current = openWebView}
        /* ... */
      />
      <View>
        /* ... */
        <CpxSurveyCards
          surveys={surveys}
          texts={texts}
          config={/* configure as shown above */}
          openWebView={openWebViewRef.current}
        />
        /* ... */
      </View>
    </>
  );
};
```


# For Developers
Before developing, run `yarn prepareDevelopment` from the root folder. 

If you made changes to the SDK (in the 'cpx_research_sdk_react_native' sub folder), you need to do the following steps in order to publish a new version:
- change directory into the 'cpx_research_sdk_react_native' sub folder: `cd cpx_research_sdk_react_native`
- if it exits, delete the cpx_research_sdk_react_native/lib folder
- run `yarn build` in order to compile the TypeScript Code to regular JavaScript
- update the version number in the package.json in the sub folder and publish these changes to npm with `npm publish` (still from the sub folder!)
