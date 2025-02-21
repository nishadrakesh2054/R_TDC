(function (React, designSystem, adminjs) {
  'use strict';

  function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

  var React__default = /*#__PURE__*/_interopDefault(React);

  // src/admin/GameSelect.js
  const GameSelect = props => {
    const [games, setGames] = React.useState([]);
    const [selectedGame, setSelectedGame] = React.useState(null);
    React.useEffect(() => {
      fetch("/api/games").then(response => response.json()).then(data => {
        const gameOptions = data.map(game => ({
          value: game.id.toString(),
          label: `${game.name} - ${game.category}`
        }));
        setGames(gameOptions);
      }).catch(error => console.error("Error fetching games:", error));
    }, []);
    React.useEffect(() => {
      if (props.value) {
        const game = games.find(g => g.value === props.value.toString());
        setSelectedGame(game || null);
      }
    }, [props.value, games]);
    const handleChange = selectedOption => {
      setSelectedGame(selectedOption);
      if (props.onChange) {
        const value = selectedOption ? selectedOption.value : null;
        props.onChange(value);
      }
    };

    // In GameSelect component
    console.log('Selected game:', selectedGame);

    // In 'before' hooks
    console.log('Request payload:', request.payload);
    return /*#__PURE__*/React__default.default.createElement(designSystem.Select, {
      ...props,
      options: games,
      onChange: handleChange,
      value: selectedGame,
      isClearable: true,
      placeholder: "Select a game..."
    });
  };

  const DownloadPDFButton = props => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const api = new adminjs.ApiClient();
    const handleDownload = async () => {
      try {
        const response = await api.resourceAction({
          resourceId: "Participations",
          actionName: "generatePDF",
          data: {
            startDate,
            endDate
          }
        });
        if (response.data.url) {
          window.open(response.data.url, "_blank");
        } else {
          console.error("No URL returned from the server");
        }
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.DatePicker, {
      value: startDate,
      onChange: date => setStartDate(date)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.DatePicker, {
      value: endDate,
      onChange: date => setEndDate(date)
    }), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleDownload
    }, "Generate PDF"));
  };

  const DashboardUI = () => {
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      variant: "grey",
      padding: "lg"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.H1, null, "\u26BD Football League Dashboard"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Welcome to the Football League Management System."), /*#__PURE__*/React__default.default.createElement(designSystem.Table, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableHead, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "\uD83C\uDFC6 League Name"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "\uD83D\uDCC5 Start Date"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "\uD83D\uDCCD Location"))), /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Premier League"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "March 10, 2025"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "London")), /*#__PURE__*/React__default.default.createElement(designSystem.TableRow, null, /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Champions League"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "April 15, 2025"), /*#__PURE__*/React__default.default.createElement(designSystem.TableCell, null, "Paris"))));
  };

  const GenerateCertificates = props => {
    const {
      record
    } = props;
    const [isGenerating, setIsGenerating] = React.useState(false);
    const [pdfUrl, setPdfUrl] = React.useState(null);
    const handleGenerateCertificates = async () => {
      setIsGenerating(true);
      try {
        const response = await fetch(`/admin/api/resources/Certificate/records/${record.id}/generateCertificates`, {
          method: "POST"
        });
        const data = await response.json();
        if (data.msg) {
          alert(data.msg);
          // Use the filename returned from the server
          setPdfUrl(`/api/download-certificates/${data.pdfFilename}`);
        }
      } catch (error) {
        console.error("Error generating certificates:", error);
        alert("Failed to generate certificates");
      } finally {
        setIsGenerating(false);
      }
    };
    return /*#__PURE__*/React__default.default.createElement(designSystem.Box, null, /*#__PURE__*/React__default.default.createElement(designSystem.H2, null, "Generate Certificates"), /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Click the button below to generate certificates using the uploaded Excel file."), /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      onClick: handleGenerateCertificates,
      disabled: isGenerating
    }, isGenerating ? "Generating..." : "Generate Certificates"), pdfUrl && /*#__PURE__*/React__default.default.createElement(designSystem.Box, {
      mt: "xl"
    }, /*#__PURE__*/React__default.default.createElement(designSystem.Text, null, "Certificates generated successfully!"), /*#__PURE__*/React__default.default.createElement(designSystem.Link, {
      href: pdfUrl,
      target: "_blank"
    }, "Download Certificates (PDF)")));
  };

  const ResumeDownloadButton = ({
    record
  }) => {
    const resumeUrl = record.params.resumeUrl;
    if (!resumeUrl) return /*#__PURE__*/React__default.default.createElement("span", null, "No resume uploaded");
    return /*#__PURE__*/React__default.default.createElement(designSystem.Button, {
      as: "a",
      href: resumeUrl,
      download: true,
      target: "_blank",
      rel: "noopener noreferrer"
    }, "Download Resume");
  };

  const Edit = ({ property, record, onChange }) => {
      const { translateProperty } = adminjs.useTranslation();
      const { params } = record;
      const { custom } = property;
      const path = adminjs.flat.get(params, custom.filePathProperty);
      const key = adminjs.flat.get(params, custom.keyProperty);
      const file = adminjs.flat.get(params, custom.fileProperty);
      const [originalKey, setOriginalKey] = React.useState(key);
      const [filesToUpload, setFilesToUpload] = React.useState([]);
      React.useEffect(() => {
          // it means means that someone hit save and new file has been uploaded
          // in this case fliesToUpload should be cleared.
          // This happens when user turns off redirect after new/edit
          if ((typeof key === 'string' && key !== originalKey)
              || (typeof key !== 'string' && !originalKey)
              || (typeof key !== 'string' && Array.isArray(key) && key.length !== originalKey.length)) {
              setOriginalKey(key);
              setFilesToUpload([]);
          }
      }, [key, originalKey]);
      const onUpload = (files) => {
          setFilesToUpload(files);
          onChange(custom.fileProperty, files);
      };
      const handleRemove = () => {
          onChange(custom.fileProperty, null);
      };
      const handleMultiRemove = (singleKey) => {
          const index = (adminjs.flat.get(record.params, custom.keyProperty) || []).indexOf(singleKey);
          const filesToDelete = adminjs.flat.get(record.params, custom.filesToDeleteProperty) || [];
          if (path && path.length > 0) {
              const newPath = path.map((currentPath, i) => (i !== index ? currentPath : null));
              let newParams = adminjs.flat.set(record.params, custom.filesToDeleteProperty, [...filesToDelete, index]);
              newParams = adminjs.flat.set(newParams, custom.filePathProperty, newPath);
              onChange({
                  ...record,
                  params: newParams,
              });
          }
          else {
              // eslint-disable-next-line no-console
              console.log('You cannot remove file when there are no uploaded files yet');
          }
      };
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(designSystem.DropZone, { onChange: onUpload, multiple: custom.multiple, validate: {
                  mimeTypes: custom.mimeTypes,
                  maxSize: custom.maxSize,
              }, files: filesToUpload }),
          !custom.multiple && key && path && !filesToUpload.length && file !== null && (React__default.default.createElement(designSystem.DropZoneItem, { filename: key, src: path, onRemove: handleRemove })),
          custom.multiple && key && key.length && path ? (React__default.default.createElement(React__default.default.Fragment, null, key.map((singleKey, index) => {
              // when we remove items we set only path index to nulls.
              // key is still there. This is because
              // we have to maintain all the indexes. So here we simply filter out elements which
              // were removed and display only what was left
              const currentPath = path[index];
              return currentPath ? (React__default.default.createElement(designSystem.DropZoneItem, { key: singleKey, filename: singleKey, src: path[index], onRemove: () => handleMultiRemove(singleKey) })) : '';
          }))) : ''));
  };

  const AudioMimeTypes = [
      'audio/aac',
      'audio/midi',
      'audio/x-midi',
      'audio/mpeg',
      'audio/ogg',
      'application/ogg',
      'audio/opus',
      'audio/wav',
      'audio/webm',
      'audio/3gpp2',
  ];
  const ImageMimeTypes = [
      'image/bmp',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/vnd.microsoft.icon',
      'image/tiff',
      'image/webp',
  ];

  // eslint-disable-next-line import/no-extraneous-dependencies
  const SingleFile = (props) => {
      const { name, path, mimeType, width } = props;
      if (path && path.length) {
          if (mimeType && ImageMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("img", { src: path, style: { maxHeight: width, maxWidth: width }, alt: name }));
          }
          if (mimeType && AudioMimeTypes.includes(mimeType)) {
              return (React__default.default.createElement("audio", { controls: true, src: path },
                  "Your browser does not support the",
                  React__default.default.createElement("code", null, "audio"),
                  React__default.default.createElement("track", { kind: "captions" })));
          }
      }
      return (React__default.default.createElement(designSystem.Box, null,
          React__default.default.createElement(designSystem.Button, { as: "a", href: path, ml: "default", size: "sm", rounded: true, target: "_blank" },
              React__default.default.createElement(designSystem.Icon, { icon: "DocumentDownload", color: "white", mr: "default" }),
              name)));
  };
  const File = ({ width, record, property }) => {
      const { custom } = property;
      let path = adminjs.flat.get(record?.params, custom.filePathProperty);
      if (!path) {
          return null;
      }
      const name = adminjs.flat.get(record?.params, custom.fileNameProperty ? custom.fileNameProperty : custom.keyProperty);
      const mimeType = custom.mimeTypeProperty
          && adminjs.flat.get(record?.params, custom.mimeTypeProperty);
      if (!property.custom.multiple) {
          if (custom.opts && custom.opts.baseUrl) {
              path = `${custom.opts.baseUrl}/${name}`;
          }
          return (React__default.default.createElement(SingleFile, { path: path, name: name, width: width, mimeType: mimeType }));
      }
      if (custom.opts && custom.opts.baseUrl) {
          const baseUrl = custom.opts.baseUrl || '';
          path = path.map((singlePath, index) => `${baseUrl}/${name[index]}`);
      }
      return (React__default.default.createElement(React__default.default.Fragment, null, path.map((singlePath, index) => (React__default.default.createElement(SingleFile, { key: singlePath, path: singlePath, name: name[index], width: width, mimeType: mimeType[index] })))));
  };

  const List = (props) => (React__default.default.createElement(File, { width: 100, ...props }));

  const Show = (props) => {
      const { property } = props;
      const { translateProperty } = adminjs.useTranslation();
      return (React__default.default.createElement(designSystem.FormGroup, null,
          React__default.default.createElement(designSystem.Label, null, translateProperty(property.label, property.resourceId)),
          React__default.default.createElement(File, { width: "100%", ...props })));
  };

  AdminJS.UserComponents = {};
  AdminJS.UserComponents.GameSelect = GameSelect;
  AdminJS.UserComponents.downloadPDF = DownloadPDFButton;
  AdminJS.UserComponents.DashboardUI = DashboardUI;
  AdminJS.UserComponents.GenerateCertificates = GenerateCertificates;
  AdminJS.UserComponents.ResumeDownloadButton = ResumeDownloadButton;
  AdminJS.UserComponents.UploadEditComponent = Edit;
  AdminJS.UserComponents.UploadListComponent = List;
  AdminJS.UserComponents.UploadShowComponent = Show;

})(React, AdminJSDesignSystem, AdminJS);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9zcmMvYWRtaW4vR2FtZVNlbGVjdC5qcyIsIi4uL3NyYy9hZG1pbi9kb3dubG9hZGJ0bi5qc3giLCIuLi9zcmMvYWRtaW4vRGFzaGJvYXJkVUkuanN4IiwiLi4vc3JjL2FkbWluL0dlbmVyYXRlQ2VydGlmaWNhdGVzLmpzeCIsIi4uL3NyYy9hZG1pbi9SZXN1bWVEb3dubG9hZEJ1dHRvbi5qc3giLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkRWRpdENvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvdHlwZXMvbWltZS10eXBlcy50eXBlLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL2ZpbGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkTGlzdENvbXBvbmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRTaG93Q29tcG9uZW50LmpzIiwiZW50cnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc3JjL2FkbWluL0dhbWVTZWxlY3QuanNcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xuXG5jb25zdCBHYW1lU2VsZWN0ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IFtnYW1lcywgc2V0R2FtZXNdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbc2VsZWN0ZWRHYW1lLCBzZXRTZWxlY3RlZEdhbWVdID0gdXNlU3RhdGUobnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaChcIi9hcGkvZ2FtZXNcIilcbiAgICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgY29uc3QgZ2FtZU9wdGlvbnMgPSBkYXRhLm1hcCgoZ2FtZSkgPT4gKHtcbiAgICAgICAgICB2YWx1ZTogZ2FtZS5pZC50b1N0cmluZygpLFxuICAgICAgICAgIGxhYmVsOiBgJHtnYW1lLm5hbWV9IC0gJHtnYW1lLmNhdGVnb3J5fWAsXG4gICAgICAgIH0pKTtcbiAgICAgICAgc2V0R2FtZXMoZ2FtZU9wdGlvbnMpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBnYW1lczpcIiwgZXJyb3IpKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHByb3BzLnZhbHVlKSB7XG4gICAgICBjb25zdCBnYW1lID0gZ2FtZXMuZmluZChnID0+IGcudmFsdWUgPT09IHByb3BzLnZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgc2V0U2VsZWN0ZWRHYW1lKGdhbWUgfHwgbnVsbCk7XG4gICAgfVxuICB9LCBbcHJvcHMudmFsdWUsIGdhbWVzXSk7XG5cbiAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKHNlbGVjdGVkT3B0aW9uKSA9PiB7XG5cdHNldFNlbGVjdGVkR2FtZShzZWxlY3RlZE9wdGlvbik7XG5cdGlmIChwcm9wcy5vbkNoYW5nZSkge1xuXHQgIGNvbnN0IHZhbHVlID0gc2VsZWN0ZWRPcHRpb24gPyBzZWxlY3RlZE9wdGlvbi52YWx1ZSA6IG51bGw7XG5cdCAgcHJvcHMub25DaGFuZ2UodmFsdWUpO1xuXHR9XG4gIH07XG5cbiAgLy8gSW4gR2FtZVNlbGVjdCBjb21wb25lbnRcbmNvbnNvbGUubG9nKCdTZWxlY3RlZCBnYW1lOicsIHNlbGVjdGVkR2FtZSk7XG5cbi8vIEluICdiZWZvcmUnIGhvb2tzXG5jb25zb2xlLmxvZygnUmVxdWVzdCBwYXlsb2FkOicsIHJlcXVlc3QucGF5bG9hZCk7XG5cbiAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2VsZWN0LCB7XG4gICAgLi4ucHJvcHMsXG4gICAgb3B0aW9uczogZ2FtZXMsXG4gICAgb25DaGFuZ2U6IGhhbmRsZUNoYW5nZSxcbiAgICB2YWx1ZTogc2VsZWN0ZWRHYW1lLFxuICAgIGlzQ2xlYXJhYmxlOiB0cnVlLFxuICAgIHBsYWNlaG9sZGVyOiBcIlNlbGVjdCBhIGdhbWUuLi5cIlxuICB9KTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWVTZWxlY3Q7IiwiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBCb3gsIEJ1dHRvbiwgRGF0ZVBpY2tlciB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG5pbXBvcnQgeyBBcGlDbGllbnQgfSBmcm9tIFwiYWRtaW5qc1wiO1xuXG5jb25zdCBEb3dubG9hZFBERkJ1dHRvbiA9IChwcm9wcykgPT4ge1xuXHRjb25zdCBbc3RhcnREYXRlLCBzZXRTdGFydERhdGVdID0gdXNlU3RhdGUobmV3IERhdGUoKSk7XG5cdGNvbnN0IFtlbmREYXRlLCBzZXRFbmREYXRlXSA9IHVzZVN0YXRlKG5ldyBEYXRlKCkpO1xuXHRjb25zdCBhcGkgPSBuZXcgQXBpQ2xpZW50KCk7XG5cblx0Y29uc3QgaGFuZGxlRG93bmxvYWQgPSBhc3luYyAoKSA9PiB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXBpLnJlc291cmNlQWN0aW9uKHtcblx0XHRcdFx0cmVzb3VyY2VJZDogXCJQYXJ0aWNpcGF0aW9uc1wiLFxuXHRcdFx0XHRhY3Rpb25OYW1lOiBcImdlbmVyYXRlUERGXCIsXG5cdFx0XHRcdGRhdGE6IHsgc3RhcnREYXRlLCBlbmREYXRlIH0sXG5cdFx0XHR9KTtcblxuXHRcdFx0aWYgKHJlc3BvbnNlLmRhdGEudXJsKSB7XG5cdFx0XHRcdHdpbmRvdy5vcGVuKHJlc3BvbnNlLmRhdGEudXJsLCBcIl9ibGFua1wiKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoXCJObyBVUkwgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyXCIpO1xuXHRcdFx0fVxuXHRcdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3IgZ2VuZXJhdGluZyBQREY6XCIsIGVycm9yKTtcblx0XHR9XG5cdH07XG5cblx0cmV0dXJuIChcblx0XHQ8Qm94PlxuXHRcdFx0PERhdGVQaWNrZXJcblx0XHRcdFx0dmFsdWU9e3N0YXJ0RGF0ZX1cblx0XHRcdFx0b25DaGFuZ2U9eyhkYXRlKSA9PiBzZXRTdGFydERhdGUoZGF0ZSl9XG5cdFx0XHQvPlxuXHRcdFx0PERhdGVQaWNrZXIgdmFsdWU9e2VuZERhdGV9IG9uQ2hhbmdlPXsoZGF0ZSkgPT4gc2V0RW5kRGF0ZShkYXRlKX0gLz5cblx0XHRcdDxCdXR0b24gb25DbGljaz17aGFuZGxlRG93bmxvYWR9PkdlbmVyYXRlIFBERjwvQnV0dG9uPlxuXHRcdDwvQm94PlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgRG93bmxvYWRQREZCdXR0b247XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IEJveCwgSDEsIFRleHQsIFRhYmxlLCBUYWJsZUhlYWQsIFRhYmxlUm93LCBUYWJsZUNlbGwgfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xyXG5cclxuY29uc3QgRGFzaGJvYXJkVUkgPSAoKSA9PiB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxCb3ggdmFyaWFudD1cImdyZXlcIiBwYWRkaW5nPVwibGdcIj5cclxuICAgICAgPEgxPuKavSBGb290YmFsbCBMZWFndWUgRGFzaGJvYXJkPC9IMT5cclxuICAgICAgPFRleHQ+V2VsY29tZSB0byB0aGUgRm9vdGJhbGwgTGVhZ3VlIE1hbmFnZW1lbnQgU3lzdGVtLjwvVGV4dD5cclxuXHJcbiAgICAgIDxUYWJsZT5cclxuICAgICAgICA8VGFibGVIZWFkPlxyXG4gICAgICAgICAgPFRhYmxlUm93PlxyXG4gICAgICAgICAgICA8VGFibGVDZWxsPvCfj4YgTGVhZ3VlIE5hbWU8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgPFRhYmxlQ2VsbD7wn5OFIFN0YXJ0IERhdGU8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgICAgPFRhYmxlQ2VsbD7wn5ONIExvY2F0aW9uPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgICA8L1RhYmxlUm93PlxyXG4gICAgICAgIDwvVGFibGVIZWFkPlxyXG4gICAgICAgIDxUYWJsZVJvdz5cclxuICAgICAgICAgIDxUYWJsZUNlbGw+UHJlbWllciBMZWFndWU8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgIDxUYWJsZUNlbGw+TWFyY2ggMTAsIDIwMjU8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgIDxUYWJsZUNlbGw+TG9uZG9uPC9UYWJsZUNlbGw+XHJcbiAgICAgICAgPC9UYWJsZVJvdz5cclxuICAgICAgICA8VGFibGVSb3c+XHJcbiAgICAgICAgICA8VGFibGVDZWxsPkNoYW1waW9ucyBMZWFndWU8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgIDxUYWJsZUNlbGw+QXByaWwgMTUsIDIwMjU8L1RhYmxlQ2VsbD5cclxuICAgICAgICAgIDxUYWJsZUNlbGw+UGFyaXM8L1RhYmxlQ2VsbD5cclxuICAgICAgICA8L1RhYmxlUm93PlxyXG4gICAgICA8L1RhYmxlPlxyXG4gICAgPC9Cb3g+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZFVJO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IEJveCwgSDIsIFRleHQsIEJ1dHRvbiwgTGluayB9IGZyb20gXCJAYWRtaW5qcy9kZXNpZ24tc3lzdGVtXCI7XG5cbmNvbnN0IEdlbmVyYXRlQ2VydGlmaWNhdGVzID0gKHByb3BzKSA9PiB7XG5cdGNvbnN0IHsgcmVjb3JkIH0gPSBwcm9wcztcblx0Y29uc3QgW2lzR2VuZXJhdGluZywgc2V0SXNHZW5lcmF0aW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcblx0Y29uc3QgW3BkZlVybCwgc2V0UGRmVXJsXSA9IHVzZVN0YXRlKG51bGwpO1xuXG5cdGNvbnN0IGhhbmRsZUdlbmVyYXRlQ2VydGlmaWNhdGVzID0gYXN5bmMgKCkgPT4ge1xuXHRcdHNldElzR2VuZXJhdGluZyh0cnVlKTtcblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChcblx0XHRcdFx0YC9hZG1pbi9hcGkvcmVzb3VyY2VzL0NlcnRpZmljYXRlL3JlY29yZHMvJHtyZWNvcmQuaWR9L2dlbmVyYXRlQ2VydGlmaWNhdGVzYCxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0XHRcdH1cblx0XHRcdCk7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuXHRcdFx0aWYgKGRhdGEubXNnKSB7XG5cdFx0XHRcdGFsZXJ0KGRhdGEubXNnKTtcblx0XHRcdFx0Ly8gVXNlIHRoZSBmaWxlbmFtZSByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2ZXJcblx0XHRcdFx0c2V0UGRmVXJsKGAvYXBpL2Rvd25sb2FkLWNlcnRpZmljYXRlcy8ke2RhdGEucGRmRmlsZW5hbWV9YCk7XG5cdFx0XHR9XG5cdFx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvciBnZW5lcmF0aW5nIGNlcnRpZmljYXRlczpcIiwgZXJyb3IpO1xuXHRcdFx0YWxlcnQoXCJGYWlsZWQgdG8gZ2VuZXJhdGUgY2VydGlmaWNhdGVzXCIpO1xuXHRcdH0gZmluYWxseSB7XG5cdFx0XHRzZXRJc0dlbmVyYXRpbmcoZmFsc2UpO1xuXHRcdH1cblx0fTtcblxuXHRyZXR1cm4gKFxuXHRcdDxCb3g+XG5cdFx0XHQ8SDI+R2VuZXJhdGUgQ2VydGlmaWNhdGVzPC9IMj5cblx0XHRcdDxUZXh0PlxuXHRcdFx0XHRDbGljayB0aGUgYnV0dG9uIGJlbG93IHRvIGdlbmVyYXRlIGNlcnRpZmljYXRlcyB1c2luZyB0aGVcblx0XHRcdFx0dXBsb2FkZWQgRXhjZWwgZmlsZS5cblx0XHRcdDwvVGV4dD5cblx0XHRcdDxCdXR0b25cblx0XHRcdFx0b25DbGljaz17aGFuZGxlR2VuZXJhdGVDZXJ0aWZpY2F0ZXN9XG5cdFx0XHRcdGRpc2FibGVkPXtpc0dlbmVyYXRpbmd9XG5cdFx0XHQ+XG5cdFx0XHRcdHtpc0dlbmVyYXRpbmcgPyBcIkdlbmVyYXRpbmcuLi5cIiA6IFwiR2VuZXJhdGUgQ2VydGlmaWNhdGVzXCJ9XG5cdFx0XHQ8L0J1dHRvbj5cblx0XHRcdHtwZGZVcmwgJiYgKFxuXHRcdFx0XHQ8Qm94IG10PVwieGxcIj5cblx0XHRcdFx0XHQ8VGV4dD5DZXJ0aWZpY2F0ZXMgZ2VuZXJhdGVkIHN1Y2Nlc3NmdWxseSE8L1RleHQ+XG5cdFx0XHRcdFx0PExpbmsgaHJlZj17cGRmVXJsfSB0YXJnZXQ9XCJfYmxhbmtcIj5cblx0XHRcdFx0XHRcdERvd25sb2FkIENlcnRpZmljYXRlcyAoUERGKVxuXHRcdFx0XHRcdDwvTGluaz5cblx0XHRcdFx0PC9Cb3g+XG5cdFx0XHQpfVxuXHRcdDwvQm94PlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgR2VuZXJhdGVDZXJ0aWZpY2F0ZXM7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tIFwiQGFkbWluanMvZGVzaWduLXN5c3RlbVwiO1xuXG5jb25zdCBSZXN1bWVEb3dubG9hZEJ1dHRvbiA9ICh7IHJlY29yZCB9KSA9PiB7XG5cdGNvbnN0IHJlc3VtZVVybCA9IHJlY29yZC5wYXJhbXMucmVzdW1lVXJsO1xuXG5cdGlmICghcmVzdW1lVXJsKSByZXR1cm4gPHNwYW4+Tm8gcmVzdW1lIHVwbG9hZGVkPC9zcGFuPjtcblxuXHRyZXR1cm4gKFxuXHRcdDxCdXR0b25cblx0XHRcdGFzPVwiYVwiXG5cdFx0XHRocmVmPXtyZXN1bWVVcmx9XG5cdFx0XHRkb3dubG9hZFxuXHRcdFx0dGFyZ2V0PVwiX2JsYW5rXCJcblx0XHRcdHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuXHRcdD5cblx0XHRcdERvd25sb2FkIFJlc3VtZVxuXHRcdDwvQnV0dG9uPlxuXHQpO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVzdW1lRG93bmxvYWRCdXR0b247XG4iLCJpbXBvcnQgeyBEcm9wWm9uZSwgRHJvcFpvbmVJdGVtLCBGb3JtR3JvdXAsIExhYmVsIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0LCB1c2VUcmFuc2xhdGlvbiB9IGZyb20gJ2FkbWluanMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5jb25zdCBFZGl0ID0gKHsgcHJvcGVydHksIHJlY29yZCwgb25DaGFuZ2UgfSkgPT4ge1xuICAgIGNvbnN0IHsgdHJhbnNsYXRlUHJvcGVydHkgfSA9IHVzZVRyYW5zbGF0aW9uKCk7XG4gICAgY29uc3QgeyBwYXJhbXMgfSA9IHJlY29yZDtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgY29uc3QgcGF0aCA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGNvbnN0IGtleSA9IGZsYXQuZ2V0KHBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBmaWxlID0gZmxhdC5nZXQocGFyYW1zLCBjdXN0b20uZmlsZVByb3BlcnR5KTtcbiAgICBjb25zdCBbb3JpZ2luYWxLZXksIHNldE9yaWdpbmFsS2V5XSA9IHVzZVN0YXRlKGtleSk7XG4gICAgY29uc3QgW2ZpbGVzVG9VcGxvYWQsIHNldEZpbGVzVG9VcGxvYWRdID0gdXNlU3RhdGUoW10pO1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIC8vIGl0IG1lYW5zIG1lYW5zIHRoYXQgc29tZW9uZSBoaXQgc2F2ZSBhbmQgbmV3IGZpbGUgaGFzIGJlZW4gdXBsb2FkZWRcbiAgICAgICAgLy8gaW4gdGhpcyBjYXNlIGZsaWVzVG9VcGxvYWQgc2hvdWxkIGJlIGNsZWFyZWQuXG4gICAgICAgIC8vIFRoaXMgaGFwcGVucyB3aGVuIHVzZXIgdHVybnMgb2ZmIHJlZGlyZWN0IGFmdGVyIG5ldy9lZGl0XG4gICAgICAgIGlmICgodHlwZW9mIGtleSA9PT0gJ3N0cmluZycgJiYga2V5ICE9PSBvcmlnaW5hbEtleSlcbiAgICAgICAgICAgIHx8ICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJyAmJiAhb3JpZ2luYWxLZXkpXG4gICAgICAgICAgICB8fCAodHlwZW9mIGtleSAhPT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShrZXkpICYmIGtleS5sZW5ndGggIT09IG9yaWdpbmFsS2V5Lmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHNldE9yaWdpbmFsS2V5KGtleSk7XG4gICAgICAgICAgICBzZXRGaWxlc1RvVXBsb2FkKFtdKTtcbiAgICAgICAgfVxuICAgIH0sIFtrZXksIG9yaWdpbmFsS2V5XSk7XG4gICAgY29uc3Qgb25VcGxvYWQgPSAoZmlsZXMpID0+IHtcbiAgICAgICAgc2V0RmlsZXNUb1VwbG9hZChmaWxlcyk7XG4gICAgICAgIG9uQ2hhbmdlKGN1c3RvbS5maWxlUHJvcGVydHksIGZpbGVzKTtcbiAgICB9O1xuICAgIGNvbnN0IGhhbmRsZVJlbW92ZSA9ICgpID0+IHtcbiAgICAgICAgb25DaGFuZ2UoY3VzdG9tLmZpbGVQcm9wZXJ0eSwgbnVsbCk7XG4gICAgfTtcbiAgICBjb25zdCBoYW5kbGVNdWx0aVJlbW92ZSA9IChzaW5nbGVLZXkpID0+IHtcbiAgICAgICAgY29uc3QgaW5kZXggPSAoZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmtleVByb3BlcnR5KSB8fCBbXSkuaW5kZXhPZihzaW5nbGVLZXkpO1xuICAgICAgICBjb25zdCBmaWxlc1RvRGVsZXRlID0gZmxhdC5nZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSkgfHwgW107XG4gICAgICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgubWFwKChjdXJyZW50UGF0aCwgaSkgPT4gKGkgIT09IGluZGV4ID8gY3VycmVudFBhdGggOiBudWxsKSk7XG4gICAgICAgICAgICBsZXQgbmV3UGFyYW1zID0gZmxhdC5zZXQocmVjb3JkLnBhcmFtcywgY3VzdG9tLmZpbGVzVG9EZWxldGVQcm9wZXJ0eSwgWy4uLmZpbGVzVG9EZWxldGUsIGluZGV4XSk7XG4gICAgICAgICAgICBuZXdQYXJhbXMgPSBmbGF0LnNldChuZXdQYXJhbXMsIGN1c3RvbS5maWxlUGF0aFByb3BlcnR5LCBuZXdQYXRoKTtcbiAgICAgICAgICAgIG9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICAuLi5yZWNvcmQsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBuZXdQYXJhbXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGNhbm5vdCByZW1vdmUgZmlsZSB3aGVuIHRoZXJlIGFyZSBubyB1cGxvYWRlZCBmaWxlcyB5ZXQnKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEZvcm1Hcm91cCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChMYWJlbCwgbnVsbCwgdHJhbnNsYXRlUHJvcGVydHkocHJvcGVydHkubGFiZWwsIHByb3BlcnR5LnJlc291cmNlSWQpKSxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZSwgeyBvbkNoYW5nZTogb25VcGxvYWQsIG11bHRpcGxlOiBjdXN0b20ubXVsdGlwbGUsIHZhbGlkYXRlOiB7XG4gICAgICAgICAgICAgICAgbWltZVR5cGVzOiBjdXN0b20ubWltZVR5cGVzLFxuICAgICAgICAgICAgICAgIG1heFNpemU6IGN1c3RvbS5tYXhTaXplLFxuICAgICAgICAgICAgfSwgZmlsZXM6IGZpbGVzVG9VcGxvYWQgfSksXG4gICAgICAgICFjdXN0b20ubXVsdGlwbGUgJiYga2V5ICYmIHBhdGggJiYgIWZpbGVzVG9VcGxvYWQubGVuZ3RoICYmIGZpbGUgIT09IG51bGwgJiYgKFJlYWN0LmNyZWF0ZUVsZW1lbnQoRHJvcFpvbmVJdGVtLCB7IGZpbGVuYW1lOiBrZXksIHNyYzogcGF0aCwgb25SZW1vdmU6IGhhbmRsZVJlbW92ZSB9KSksXG4gICAgICAgIGN1c3RvbS5tdWx0aXBsZSAmJiBrZXkgJiYga2V5Lmxlbmd0aCAmJiBwYXRoID8gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIGtleS5tYXAoKHNpbmdsZUtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIC8vIHdoZW4gd2UgcmVtb3ZlIGl0ZW1zIHdlIHNldCBvbmx5IHBhdGggaW5kZXggdG8gbnVsbHMuXG4gICAgICAgICAgICAvLyBrZXkgaXMgc3RpbGwgdGhlcmUuIFRoaXMgaXMgYmVjYXVzZVxuICAgICAgICAgICAgLy8gd2UgaGF2ZSB0byBtYWludGFpbiBhbGwgdGhlIGluZGV4ZXMuIFNvIGhlcmUgd2Ugc2ltcGx5IGZpbHRlciBvdXQgZWxlbWVudHMgd2hpY2hcbiAgICAgICAgICAgIC8vIHdlcmUgcmVtb3ZlZCBhbmQgZGlzcGxheSBvbmx5IHdoYXQgd2FzIGxlZnRcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYXRoID0gcGF0aFtpbmRleF07XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFBhdGggPyAoUmVhY3QuY3JlYXRlRWxlbWVudChEcm9wWm9uZUl0ZW0sIHsga2V5OiBzaW5nbGVLZXksIGZpbGVuYW1lOiBzaW5nbGVLZXksIHNyYzogcGF0aFtpbmRleF0sIG9uUmVtb3ZlOiAoKSA9PiBoYW5kbGVNdWx0aVJlbW92ZShzaW5nbGVLZXkpIH0pKSA6ICcnO1xuICAgICAgICB9KSkpIDogJycpKTtcbn07XG5leHBvcnQgZGVmYXVsdCBFZGl0O1xuIiwiZXhwb3J0IGNvbnN0IEF1ZGlvTWltZVR5cGVzID0gW1xuICAgICdhdWRpby9hYWMnLFxuICAgICdhdWRpby9taWRpJyxcbiAgICAnYXVkaW8veC1taWRpJyxcbiAgICAnYXVkaW8vbXBlZycsXG4gICAgJ2F1ZGlvL29nZycsXG4gICAgJ2FwcGxpY2F0aW9uL29nZycsXG4gICAgJ2F1ZGlvL29wdXMnLFxuICAgICdhdWRpby93YXYnLFxuICAgICdhdWRpby93ZWJtJyxcbiAgICAnYXVkaW8vM2dwcDInLFxuXTtcbmV4cG9ydCBjb25zdCBWaWRlb01pbWVUeXBlcyA9IFtcbiAgICAndmlkZW8veC1tc3ZpZGVvJyxcbiAgICAndmlkZW8vbXBlZycsXG4gICAgJ3ZpZGVvL29nZycsXG4gICAgJ3ZpZGVvL21wMnQnLFxuICAgICd2aWRlby93ZWJtJyxcbiAgICAndmlkZW8vM2dwcCcsXG4gICAgJ3ZpZGVvLzNncHAyJyxcbl07XG5leHBvcnQgY29uc3QgSW1hZ2VNaW1lVHlwZXMgPSBbXG4gICAgJ2ltYWdlL2JtcCcsXG4gICAgJ2ltYWdlL2dpZicsXG4gICAgJ2ltYWdlL2pwZWcnLFxuICAgICdpbWFnZS9wbmcnLFxuICAgICdpbWFnZS9zdmcreG1sJyxcbiAgICAnaW1hZ2Uvdm5kLm1pY3Jvc29mdC5pY29uJyxcbiAgICAnaW1hZ2UvdGlmZicsXG4gICAgJ2ltYWdlL3dlYnAnLFxuXTtcbmV4cG9ydCBjb25zdCBDb21wcmVzc2VkTWltZVR5cGVzID0gW1xuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAnLFxuICAgICdhcHBsaWNhdGlvbi94LWJ6aXAyJyxcbiAgICAnYXBwbGljYXRpb24vZ3ppcCcsXG4gICAgJ2FwcGxpY2F0aW9uL2phdmEtYXJjaGl2ZScsXG4gICAgJ2FwcGxpY2F0aW9uL3gtdGFyJyxcbiAgICAnYXBwbGljYXRpb24vemlwJyxcbiAgICAnYXBwbGljYXRpb24veC03ei1jb21wcmVzc2VkJyxcbl07XG5leHBvcnQgY29uc3QgRG9jdW1lbnRNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL3gtYWJpd29yZCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtZnJlZWFyYycsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5hbWF6b24uZWJvb2snLFxuICAgICdhcHBsaWNhdGlvbi9tc3dvcmQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQud29yZHByb2Nlc3NpbmdtbC5kb2N1bWVudCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1mb250b2JqZWN0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC5wcmVzZW50YXRpb24nLFxuICAgICdhcHBsaWNhdGlvbi92bmQub2FzaXMub3BlbmRvY3VtZW50LnNwcmVhZHNoZWV0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm9hc2lzLm9wZW5kb2N1bWVudC50ZXh0JyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1zLXBvd2VycG9pbnQnLFxuICAgICdhcHBsaWNhdGlvbi92bmQub3BlbnhtbGZvcm1hdHMtb2ZmaWNlZG9jdW1lbnQucHJlc2VudGF0aW9ubWwucHJlc2VudGF0aW9uJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLnJhcicsXG4gICAgJ2FwcGxpY2F0aW9uL3J0ZicsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5tcy1leGNlbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3ZuZC5vcGVueG1sZm9ybWF0cy1vZmZpY2Vkb2N1bWVudC5zcHJlYWRzaGVldG1sLnNoZWV0Jyxcbl07XG5leHBvcnQgY29uc3QgVGV4dE1pbWVUeXBlcyA9IFtcbiAgICAndGV4dC9jc3MnLFxuICAgICd0ZXh0L2NzdicsXG4gICAgJ3RleHQvaHRtbCcsXG4gICAgJ3RleHQvY2FsZW5kYXInLFxuICAgICd0ZXh0L2phdmFzY3JpcHQnLFxuICAgICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnYXBwbGljYXRpb24vbGQranNvbicsXG4gICAgJ3RleHQvamF2YXNjcmlwdCcsXG4gICAgJ3RleHQvcGxhaW4nLFxuICAgICdhcHBsaWNhdGlvbi94aHRtbCt4bWwnLFxuICAgICdhcHBsaWNhdGlvbi94bWwnLFxuICAgICd0ZXh0L3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IEJpbmFyeURvY3NNaW1lVHlwZXMgPSBbXG4gICAgJ2FwcGxpY2F0aW9uL2VwdWIremlwJyxcbiAgICAnYXBwbGljYXRpb24vcGRmJyxcbl07XG5leHBvcnQgY29uc3QgRm9udE1pbWVUeXBlcyA9IFtcbiAgICAnZm9udC9vdGYnLFxuICAgICdmb250L3R0ZicsXG4gICAgJ2ZvbnQvd29mZicsXG4gICAgJ2ZvbnQvd29mZjInLFxuXTtcbmV4cG9ydCBjb25zdCBPdGhlck1pbWVUeXBlcyA9IFtcbiAgICAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAnYXBwbGljYXRpb24veC1jc2gnLFxuICAgICdhcHBsaWNhdGlvbi92bmQuYXBwbGUuaW5zdGFsbGVyK3htbCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtaHR0cGQtcGhwJyxcbiAgICAnYXBwbGljYXRpb24veC1zaCcsXG4gICAgJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJyxcbiAgICAndm5kLnZpc2lvJyxcbiAgICAnYXBwbGljYXRpb24vdm5kLm1vemlsbGEueHVsK3htbCcsXG5dO1xuZXhwb3J0IGNvbnN0IE1pbWVUeXBlcyA9IFtcbiAgICAuLi5BdWRpb01pbWVUeXBlcyxcbiAgICAuLi5WaWRlb01pbWVUeXBlcyxcbiAgICAuLi5JbWFnZU1pbWVUeXBlcyxcbiAgICAuLi5Db21wcmVzc2VkTWltZVR5cGVzLFxuICAgIC4uLkRvY3VtZW50TWltZVR5cGVzLFxuICAgIC4uLlRleHRNaW1lVHlwZXMsXG4gICAgLi4uQmluYXJ5RG9jc01pbWVUeXBlcyxcbiAgICAuLi5PdGhlck1pbWVUeXBlcyxcbiAgICAuLi5Gb250TWltZVR5cGVzLFxuICAgIC4uLk90aGVyTWltZVR5cGVzLFxuXTtcbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IEJveCwgQnV0dG9uLCBJY29uIH0gZnJvbSAnQGFkbWluanMvZGVzaWduLXN5c3RlbSc7XG5pbXBvcnQgeyBmbGF0IH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgQXVkaW9NaW1lVHlwZXMsIEltYWdlTWltZVR5cGVzIH0gZnJvbSAnLi4vdHlwZXMvbWltZS10eXBlcy50eXBlLmpzJztcbmNvbnN0IFNpbmdsZUZpbGUgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IG5hbWUsIHBhdGgsIG1pbWVUeXBlLCB3aWR0aCB9ID0gcHJvcHM7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICAgICAgaWYgKG1pbWVUeXBlICYmIEltYWdlTWltZVR5cGVzLmluY2x1ZGVzKG1pbWVUeXBlKSkge1xuICAgICAgICAgICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KFwiaW1nXCIsIHsgc3JjOiBwYXRoLCBzdHlsZTogeyBtYXhIZWlnaHQ6IHdpZHRoLCBtYXhXaWR0aDogd2lkdGggfSwgYWx0OiBuYW1lIH0pKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobWltZVR5cGUgJiYgQXVkaW9NaW1lVHlwZXMuaW5jbHVkZXMobWltZVR5cGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhdWRpb1wiLCB7IGNvbnRyb2xzOiB0cnVlLCBzcmM6IHBhdGggfSxcbiAgICAgICAgICAgICAgICBcIllvdXIgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IHRoZVwiLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXCJjb2RlXCIsIG51bGwsIFwiYXVkaW9cIiksXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcInRyYWNrXCIsIHsga2luZDogXCJjYXB0aW9uc1wiIH0pKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChSZWFjdC5jcmVhdGVFbGVtZW50KEJveCwgbnVsbCxcbiAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChCdXR0b24sIHsgYXM6IFwiYVwiLCBocmVmOiBwYXRoLCBtbDogXCJkZWZhdWx0XCIsIHNpemU6IFwic21cIiwgcm91bmRlZDogdHJ1ZSwgdGFyZ2V0OiBcIl9ibGFua1wiIH0sXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KEljb24sIHsgaWNvbjogXCJEb2N1bWVudERvd25sb2FkXCIsIGNvbG9yOiBcIndoaXRlXCIsIG1yOiBcImRlZmF1bHRcIiB9KSxcbiAgICAgICAgICAgIG5hbWUpKSk7XG59O1xuY29uc3QgRmlsZSA9ICh7IHdpZHRoLCByZWNvcmQsIHByb3BlcnR5IH0pID0+IHtcbiAgICBjb25zdCB7IGN1c3RvbSB9ID0gcHJvcGVydHk7XG4gICAgbGV0IHBhdGggPSBmbGF0LmdldChyZWNvcmQ/LnBhcmFtcywgY3VzdG9tLmZpbGVQYXRoUHJvcGVydHkpO1xuICAgIGlmICghcGF0aCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgbmFtZSA9IGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20uZmlsZU5hbWVQcm9wZXJ0eSA/IGN1c3RvbS5maWxlTmFtZVByb3BlcnR5IDogY3VzdG9tLmtleVByb3BlcnR5KTtcbiAgICBjb25zdCBtaW1lVHlwZSA9IGN1c3RvbS5taW1lVHlwZVByb3BlcnR5XG4gICAgICAgICYmIGZsYXQuZ2V0KHJlY29yZD8ucGFyYW1zLCBjdXN0b20ubWltZVR5cGVQcm9wZXJ0eSk7XG4gICAgaWYgKCFwcm9wZXJ0eS5jdXN0b20ubXVsdGlwbGUpIHtcbiAgICAgICAgaWYgKGN1c3RvbS5vcHRzICYmIGN1c3RvbS5vcHRzLmJhc2VVcmwpIHtcbiAgICAgICAgICAgIHBhdGggPSBgJHtjdXN0b20ub3B0cy5iYXNlVXJsfS8ke25hbWV9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBwYXRoOiBwYXRoLCBuYW1lOiBuYW1lLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZSB9KSk7XG4gICAgfVxuICAgIGlmIChjdXN0b20ub3B0cyAmJiBjdXN0b20ub3B0cy5iYXNlVXJsKSB7XG4gICAgICAgIGNvbnN0IGJhc2VVcmwgPSBjdXN0b20ub3B0cy5iYXNlVXJsIHx8ICcnO1xuICAgICAgICBwYXRoID0gcGF0aC5tYXAoKHNpbmdsZVBhdGgsIGluZGV4KSA9PiBgJHtiYXNlVXJsfS8ke25hbWVbaW5kZXhdfWApO1xuICAgIH1cbiAgICByZXR1cm4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoUmVhY3QuRnJhZ21lbnQsIG51bGwsIHBhdGgubWFwKChzaW5nbGVQYXRoLCBpbmRleCkgPT4gKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU2luZ2xlRmlsZSwgeyBrZXk6IHNpbmdsZVBhdGgsIHBhdGg6IHNpbmdsZVBhdGgsIG5hbWU6IG5hbWVbaW5kZXhdLCB3aWR0aDogd2lkdGgsIG1pbWVUeXBlOiBtaW1lVHlwZVtpbmRleF0gfSkpKSkpO1xufTtcbmV4cG9ydCBkZWZhdWx0IEZpbGU7XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IExpc3QgPSAocHJvcHMpID0+IChSZWFjdC5jcmVhdGVFbGVtZW50KEZpbGUsIHsgd2lkdGg6IDEwMCwgLi4ucHJvcHMgfSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCB7IEZvcm1Hcm91cCwgTGFiZWwgfSBmcm9tICdAYWRtaW5qcy9kZXNpZ24tc3lzdGVtJztcbmltcG9ydCB7IHVzZVRyYW5zbGF0aW9uIH0gZnJvbSAnYWRtaW5qcyc7XG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IEZpbGUgZnJvbSAnLi9maWxlLmpzJztcbmNvbnN0IFNob3cgPSAocHJvcHMpID0+IHtcbiAgICBjb25zdCB7IHByb3BlcnR5IH0gPSBwcm9wcztcbiAgICBjb25zdCB7IHRyYW5zbGF0ZVByb3BlcnR5IH0gPSB1c2VUcmFuc2xhdGlvbigpO1xuICAgIHJldHVybiAoUmVhY3QuY3JlYXRlRWxlbWVudChGb3JtR3JvdXAsIG51bGwsXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoTGFiZWwsIG51bGwsIHRyYW5zbGF0ZVByb3BlcnR5KHByb3BlcnR5LmxhYmVsLCBwcm9wZXJ0eS5yZXNvdXJjZUlkKSksXG4gICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoRmlsZSwgeyB3aWR0aDogXCIxMDAlXCIsIC4uLnByb3BzIH0pKSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgU2hvdztcbiIsIkFkbWluSlMuVXNlckNvbXBvbmVudHMgPSB7fVxuaW1wb3J0IEdhbWVTZWxlY3QgZnJvbSAnLi4vc3JjL2FkbWluL0dhbWVTZWxlY3QnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLkdhbWVTZWxlY3QgPSBHYW1lU2VsZWN0XG5pbXBvcnQgZG93bmxvYWRQREYgZnJvbSAnLi4vc3JjL2FkbWluL2Rvd25sb2FkYnRuJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5kb3dubG9hZFBERiA9IGRvd25sb2FkUERGXG5pbXBvcnQgRGFzaGJvYXJkVUkgZnJvbSAnLi4vc3JjL2FkbWluL0Rhc2hib2FyZFVJJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5EYXNoYm9hcmRVSSA9IERhc2hib2FyZFVJXG5pbXBvcnQgR2VuZXJhdGVDZXJ0aWZpY2F0ZXMgZnJvbSAnLi4vc3JjL2FkbWluL0dlbmVyYXRlQ2VydGlmaWNhdGVzJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5HZW5lcmF0ZUNlcnRpZmljYXRlcyA9IEdlbmVyYXRlQ2VydGlmaWNhdGVzXG5pbXBvcnQgUmVzdW1lRG93bmxvYWRCdXR0b24gZnJvbSAnLi4vc3JjL2FkbWluL1Jlc3VtZURvd25sb2FkQnV0dG9uJ1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5SZXN1bWVEb3dubG9hZEJ1dHRvbiA9IFJlc3VtZURvd25sb2FkQnV0dG9uXG5pbXBvcnQgVXBsb2FkRWRpdENvbXBvbmVudCBmcm9tICcuLi9ub2RlX21vZHVsZXMvQGFkbWluanMvdXBsb2FkL2J1aWxkL2ZlYXR1cmVzL3VwbG9hZC1maWxlL2NvbXBvbmVudHMvVXBsb2FkRWRpdENvbXBvbmVudCdcbkFkbWluSlMuVXNlckNvbXBvbmVudHMuVXBsb2FkRWRpdENvbXBvbmVudCA9IFVwbG9hZEVkaXRDb21wb25lbnRcbmltcG9ydCBVcGxvYWRMaXN0Q29tcG9uZW50IGZyb20gJy4uL25vZGVfbW9kdWxlcy9AYWRtaW5qcy91cGxvYWQvYnVpbGQvZmVhdHVyZXMvdXBsb2FkLWZpbGUvY29tcG9uZW50cy9VcGxvYWRMaXN0Q29tcG9uZW50J1xuQWRtaW5KUy5Vc2VyQ29tcG9uZW50cy5VcGxvYWRMaXN0Q29tcG9uZW50ID0gVXBsb2FkTGlzdENvbXBvbmVudFxuaW1wb3J0IFVwbG9hZFNob3dDb21wb25lbnQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL0BhZG1pbmpzL3VwbG9hZC9idWlsZC9mZWF0dXJlcy91cGxvYWQtZmlsZS9jb21wb25lbnRzL1VwbG9hZFNob3dDb21wb25lbnQnXG5BZG1pbkpTLlVzZXJDb21wb25lbnRzLlVwbG9hZFNob3dDb21wb25lbnQgPSBVcGxvYWRTaG93Q29tcG9uZW50Il0sIm5hbWVzIjpbIkdhbWVTZWxlY3QiLCJwcm9wcyIsImdhbWVzIiwic2V0R2FtZXMiLCJ1c2VTdGF0ZSIsInNlbGVjdGVkR2FtZSIsInNldFNlbGVjdGVkR2FtZSIsInVzZUVmZmVjdCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsImRhdGEiLCJnYW1lT3B0aW9ucyIsIm1hcCIsImdhbWUiLCJ2YWx1ZSIsImlkIiwidG9TdHJpbmciLCJsYWJlbCIsIm5hbWUiLCJjYXRlZ29yeSIsImNhdGNoIiwiZXJyb3IiLCJjb25zb2xlIiwiZmluZCIsImciLCJoYW5kbGVDaGFuZ2UiLCJzZWxlY3RlZE9wdGlvbiIsIm9uQ2hhbmdlIiwibG9nIiwicmVxdWVzdCIsInBheWxvYWQiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJTZWxlY3QiLCJvcHRpb25zIiwiaXNDbGVhcmFibGUiLCJwbGFjZWhvbGRlciIsIkRvd25sb2FkUERGQnV0dG9uIiwic3RhcnREYXRlIiwic2V0U3RhcnREYXRlIiwiRGF0ZSIsImVuZERhdGUiLCJzZXRFbmREYXRlIiwiYXBpIiwiQXBpQ2xpZW50IiwiaGFuZGxlRG93bmxvYWQiLCJyZXNvdXJjZUFjdGlvbiIsInJlc291cmNlSWQiLCJhY3Rpb25OYW1lIiwidXJsIiwid2luZG93Iiwib3BlbiIsIkJveCIsIkRhdGVQaWNrZXIiLCJkYXRlIiwiQnV0dG9uIiwib25DbGljayIsIkRhc2hib2FyZFVJIiwidmFyaWFudCIsInBhZGRpbmciLCJIMSIsIlRleHQiLCJUYWJsZSIsIlRhYmxlSGVhZCIsIlRhYmxlUm93IiwiVGFibGVDZWxsIiwiR2VuZXJhdGVDZXJ0aWZpY2F0ZXMiLCJyZWNvcmQiLCJpc0dlbmVyYXRpbmciLCJzZXRJc0dlbmVyYXRpbmciLCJwZGZVcmwiLCJzZXRQZGZVcmwiLCJoYW5kbGVHZW5lcmF0ZUNlcnRpZmljYXRlcyIsIm1ldGhvZCIsIm1zZyIsImFsZXJ0IiwicGRmRmlsZW5hbWUiLCJIMiIsImRpc2FibGVkIiwibXQiLCJMaW5rIiwiaHJlZiIsInRhcmdldCIsIlJlc3VtZURvd25sb2FkQnV0dG9uIiwicmVzdW1lVXJsIiwicGFyYW1zIiwiYXMiLCJkb3dubG9hZCIsInJlbCIsInVzZVRyYW5zbGF0aW9uIiwiZmxhdCIsIkZvcm1Hcm91cCIsIkxhYmVsIiwiRHJvcFpvbmUiLCJEcm9wWm9uZUl0ZW0iLCJJY29uIiwiQWRtaW5KUyIsIlVzZXJDb21wb25lbnRzIiwiZG93bmxvYWRQREYiLCJVcGxvYWRFZGl0Q29tcG9uZW50IiwiVXBsb2FkTGlzdENvbXBvbmVudCIsIlVwbG9hZFNob3dDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFBQTtFQUlBLE1BQU1BLFVBQVUsR0FBSUMsS0FBSyxJQUFLO0lBQzVCLE1BQU0sQ0FBQ0MsS0FBSyxFQUFFQyxRQUFRLENBQUMsR0FBR0MsY0FBUSxDQUFDLEVBQUUsQ0FBQztJQUN0QyxNQUFNLENBQUNDLFlBQVksRUFBRUMsZUFBZSxDQUFDLEdBQUdGLGNBQVEsQ0FBQyxJQUFJLENBQUM7RUFFdERHLEVBQUFBLGVBQVMsQ0FBQyxNQUFNO0VBQ2RDLElBQUFBLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FDaEJDLElBQUksQ0FBRUMsUUFBUSxJQUFLQSxRQUFRLENBQUNDLElBQUksRUFBRSxDQUFDLENBQ25DRixJQUFJLENBQUVHLElBQUksSUFBSztFQUNkLE1BQUEsTUFBTUMsV0FBVyxHQUFHRCxJQUFJLENBQUNFLEdBQUcsQ0FBRUMsSUFBSSxLQUFNO0VBQ3RDQyxRQUFBQSxLQUFLLEVBQUVELElBQUksQ0FBQ0UsRUFBRSxDQUFDQyxRQUFRLEVBQUU7VUFDekJDLEtBQUssRUFBRSxHQUFHSixJQUFJLENBQUNLLElBQUksQ0FBTUwsR0FBQUEsRUFBQUEsSUFBSSxDQUFDTSxRQUFRLENBQUE7RUFDeEMsT0FBQyxDQUFDLENBQUM7UUFDSGxCLFFBQVEsQ0FBQ1UsV0FBVyxDQUFDO0VBQ3ZCLEtBQUMsQ0FBQyxDQUNEUyxLQUFLLENBQUVDLEtBQUssSUFBS0MsT0FBTyxDQUFDRCxLQUFLLENBQUMsdUJBQXVCLEVBQUVBLEtBQUssQ0FBQyxDQUFDO0tBQ25FLEVBQUUsRUFBRSxDQUFDO0VBRU5oQixFQUFBQSxlQUFTLENBQUMsTUFBTTtNQUNkLElBQUlOLEtBQUssQ0FB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RSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQzVOLENBQUM7O0VDekNELE1BQU0sSUFBSSxHQUFHLENBQUMsS0FBSyxNQUFNQSxzQkFBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsS0FBSyxFQUFFLENBQUMsQ0FBQzs7RUNFN0UsTUFBTSxJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUs7RUFDeEIsSUFBSSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSztFQUM5QixJQUFJLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxHQUFHMEQsc0JBQWMsRUFBRTtFQUNsRCxJQUFJLFFBQVExRCxzQkFBSyxDQUFDLGFBQWEsQ0FBQzRELHNCQUFTLEVBQUUsSUFBSTtFQUMvQyxRQUFRNUQsc0JBQUssQ0FBQyxhQUFhLENBQUM2RCxrQkFBSyxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztFQUNoRyxRQUFRN0Qsc0JBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUM7RUFDL0QsQ0FBQzs7RUNWRGlFLE9BQU8sQ0FBQ0MsY0FBYyxHQUFHLEVBQUU7RUFFM0JELE9BQU8sQ0FBQ0MsY0FBYyxDQUFDbkcsVUFBVSxHQUFHQSxVQUFVO0VBRTlDa0csT0FBTyxDQUFDQyxjQUFjLENBQUNDLFdBQVcsR0FBR0EsaUJBQVc7RUFFaERGLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDeEMsV0FBVyxHQUFHQSxXQUFXO0VBRWhEdUMsT0FBTyxDQUFDQyxjQUFjLENBQUMvQixvQkFBb0IsR0FBR0Esb0JBQW9CO0VBRWxFOEIsT0FBTyxDQUFDQyxjQUFjLENBQUNkLG9CQUFvQixHQUFHQSxvQkFBb0I7RUFFbEVhLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRSxtQkFBbUIsR0FBR0EsSUFBbUI7RUFFaEVILE9BQU8sQ0FBQ0MsY0FBYyxDQUFDRyxtQkFBbUIsR0FBR0EsSUFBbUI7RUFFaEVKLE9BQU8sQ0FBQ0MsY0FBYyxDQUFDSSxtQkFBbUIsR0FBR0EsSUFBbUI7Ozs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbNSw2LDcsOCw5XX0=
