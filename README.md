# Tasks sample application
Open source cross-platform Tasks app built with NativeScript.

Use this application to find-out how to implement common mobile scenarios with NativeScript.

![](https://www.nativescript.org/images/default-source/default-album/sample-tasks-list.png)
![](https://www.nativescript.org/images/default-source/default-album/sample-tasks-details.png)

## Running the sample

1. Make sure you have the [NativeScript Command Line Interface](https://www.npmjs.com/package/nativescript) installed as well as all the prerequisites for the NativeScript development, described in the [installation guide](https://docs.nativescript.org/setup/quick-setup#the-nativescript-cli).
2. Clone the repo:

    ```
    git clone https://github.com/NativeScript/sample-Tasks.git
    cd sample-Tasks
    ```
3. Run the project.

    `tns run ios|android [--emulator]`

    The `--emulator` keyword instructs the CLI to load the iOS simulator or an android emulator depending on the platform you want.

## Application Scenario

We chose an app that we know will cover a lot of useful scenarios:

1. User management
  1. User authentication
  2. User registration
  3. User welcome email

2. Cloud data 
  1. read, update, delete and create data entry stored in the cloud
  2. Offline support for the data (not in this article, but coming soon)

3. Modern UX
  1. Using SideBar
  2. Pull to Refresh
  3. FAB (floating action button for Android Lollipop)
  4. Load on demand for many tasks

4. Device integration
  1. using camera
  2. using phone contacts

5. Patterns/Technologies used
  1. MVVM 
  2. CSS for styling
  3. XML and data-binding for describing the UI
  4. Platform specific targeting for the Android FAB button       

Please read the series of articles that explain how this application is being implemented - https://www.nativescript.org/blog/nativescript-open-source-sample---tasks
![](https://ga-beacon.appspot.com/UA-111455-24/nativescript/sample-Tasks?pixel) 
