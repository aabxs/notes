<script>
import { RouterLink, RouterView } from "vue-router";
</script>
<script setup>
defineProps({
  width: {
    type: String,
  },
});
</script>
<template>
  <div>
    <div class="center">
      <div class="container-fluid">
        <div class="container">
          <h1>About</h1>
          <p>
            Welcome to StudentSpark! At StudentSpark, we believe in empowering
            students to excel in their academic journeys by providing them with
            a powerful digital notebook designed to enhance organization,
            productivity, and goal-setting. Our platform is tailored
            specifically to meet the needs of students, offering a range of
            features to streamline note-taking, target-setting, and reminders.
            <br />
            Efficient note-taking is a fundamental aspect of successful
            studying, and StudentSpark is here to revolutionise the way you
            capture and organise your class materials. Our intuitive interface
            allows you to create comprehensive, neatly structured notes,
            ensuring that you can easily review and revise your coursework. Say
            goodbye to scattered notebooks and hello to a clutter-free digital
            workspace!
            <br />
            But StudentSpark is more than just a note-taking tool. We understand
            that setting and tracking targets is crucial for effective progress
            and motivation. With our platform, you can effortlessly create
            targets, set deadlines, and monitor your progress as you work
            towards achieving your goals. Whether it's completing assignments,
            preparing for exams, or staying on top of projects, StudentSpark is
            your reliable companion throughout your academic endeavors. To
            ensure you never miss a deadline or overlook an important task,
            StudentSpark offers a unique reminder feature. We understand that
            student life can be hectic, with multiple commitments and deadlines
            to juggle. Our platform sends you timely email reminders, helping
            you stay organized and on track. You'll never have to worry about
            forgetting an assignment or missing an important due date again.
            <br />
            Privacy and security are paramount to us at StudentSpark. We adhere
            to stringent data protection measures, ensuring that your notes and
            personal information are kept confidential and secure. We prioritise
            the trust you place in us, and our commitment to maintaining your
            privacy remains unwavering.
            <br />
            Ready to embark on a seamless and organised student journey? Join
            StudentSpark today and unlock the potential of your academic
            pursuits. Experience the convenience of a digital notebook tailored
            to students, offering note-taking, target-setting, and reminder
            features all in one place. Say hello to enhanced productivity and
            bid farewell to academic chaos! Start your student journey with
            StudentSpark now. Sign up and create an account to gain access to
            our comprehensive suite of tools designed to support your academic
            success. Let us be your partner in achieving your goals and
            maximising your potential. Welcome to StudentSpark, where
            organisation meets excellence!
          </p>
        </div>
      </div>
      <div v-if="error">
        <Notification :message="message" :success="false" />
      </div>
      <div v-if="success">
        <Notification :message="message" :success="true" />
      </div>
    </div>
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/"
        >
          home
        </RouterLink>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/contact"
        >
          contact
        </RouterLink>
        <RouterLink
          style="text-decoration: none !important"
          class="px-3"
          to="/terms"
        >
          terms
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  background-color: #181c1c !important;
  padding: 7.5px 15px;
  font-size: 1.15em;
  border-radius: 5px 5px;
}

.center {
  min-height: 90vh;
  display: flex;
  align-items: center;
}
</style>
